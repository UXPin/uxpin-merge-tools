import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { isArray, reduce } from 'lodash';
import { parse } from 'querystring';
import { PageContent } from '../../../../../../common/types/PageData';
import { DeletedElements, PageIncrementalUpdate } from '../../../../../../common/types/PageIncrementalUpdate';
import { getPageContent } from '../../../common/page/content/getPageContent';
import { writePageContent } from '../../../common/page/content/writePageContent';
import { getAccessControlHeaders } from '../../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../../startExperimentationServer';
import { handleImplementationError } from '../../error/handleImplementationError';
import { RequestHandler } from '../../RequestHandler';

export const PAGE_FILE_NAME:string = 'page.json';

// tslint:disable prefer-function-over-method
export class PageSaveHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    this.handleSaveRequest(request, response).catch((error) => handleImplementationError(response, error));
  }

  private async handleSaveRequest(request:IncomingMessage, response:ServerResponse):Promise<void> {
    const formData:ParsedFormData = await this.getFormData(request);
    const requestPayload:PageIncrementalUpdate = JSON.parse(formData.json);
    await this.updatePage(requestPayload);
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });
    response.write('{}');
    response.end();
  }

  private getFormData(request:IncomingMessage):Promise<ParsedFormData> {
    return new Promise((resolve) => {
      let body:string = '';
      request.on('data', (chunk) => {
        body += chunk.toString();
      });
      request.on('end', () => {
        resolve(parse(body));
      });
    });
  }

  private async updatePage(changes:PageIncrementalUpdate):Promise<void> {
    const oldPage:PageContent = await getPageContent(this.context.uxpinDirPath);
    const remainingElements:PageContent = removeElements(oldPage, changes.deleted_elements);
    const newPage:PageContent = {
      ...remainingElements,
      ...reduce(changes.changed_elements, (newContent, element, elementId) => {
        newContent[elementId] = {
          ...element,
          props: {
            ...(oldPage[elementId] || { props: {} }).props,
            ...element.props,
          },
        };
        return newContent;
      }, {} as PageContent),
    };
    await writePageContent(this.context.uxpinDirPath, newPage);
  }

}

export interface ParsedFormData {
  json:string;
}

function removeElements(pageContent:PageContent, deleted:DeletedElements):PageContent {
  const elementIds:string[] = getElementIds(deleted);
  return reduce(pageContent, (newContent, element, elementId) => {
    if (!elementIds.includes(elementId)) {
      newContent[elementId] = element;
    }
    return newContent;
  }, {} as PageContent);
}

function getElementIds(deleted:DeletedElements):string[] {
  if (isArray(deleted)) {
    return [];
  }
  return reduce(deleted, (ids, isDeleted, elementId) => {
    if (isDeleted) {
      ids.push(elementId);
    }
    return ids;
  }, [] as string[]);
}
