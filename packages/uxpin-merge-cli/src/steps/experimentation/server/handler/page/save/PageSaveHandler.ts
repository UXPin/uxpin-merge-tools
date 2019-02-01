import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { PageIncrementalUpdate } from '../../../../../../common/types/PageIncrementalUpdate';
import { prepareDataFromPayload } from '../../../common/payload/prepareDataFromPayload';
import { getAccessControlHeaders } from '../../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../../startExperimentationServer';
import { handleImplementationError } from '../../error/handleImplementationError';
import { RequestHandler } from '../../RequestHandler';
import { updatePage } from './updatePage';

export const PAGE_FILE_NAME:string = 'page.json';

// tslint:disable prefer-function-over-method
export class PageSaveHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    this.handleSaveRequest(request, response).catch((error) => handleImplementationError(response, error));
  }

  private async handleSaveRequest(request:IncomingMessage, response:ServerResponse):Promise<void> {
    const requestPayload:PageIncrementalUpdate = await prepareDataFromPayload(request);
    await this.updatePage(requestPayload);
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(request.headers),
    });
    response.write('{}');
    response.end();
  }

  private updatePage(changes:PageIncrementalUpdate):Promise<void> {
    return updatePage(this.context.uxpinDirPath, changes);
  }
}

export interface ParsedFormData {
  json:string;
}
