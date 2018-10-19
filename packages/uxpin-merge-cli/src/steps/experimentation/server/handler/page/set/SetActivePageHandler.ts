import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { PageData } from '../../../../../../common/types/PageData';
import { DesignSystemSnapshot } from '../../../../../serialization/DesignSystemSnapshot';
import { getProjectMetadata } from '../../../../metadata/getProjectMetadata';
import { getPageData } from '../../../common/page/data/getPageData';
import { getAccessControlHeaders } from '../../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../../startExperimentationServer';
import { ImplementationErrorHandler } from '../../error/ImplementationErrorHandler';
import { RequestHandler } from '../../RequestHandler';

export class SetActivePageHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    this.respondWithPageContent(response).catch((error) => {
      new ImplementationErrorHandler(error).handle(request, response);
    });
  }

  private async respondWithPageContent(response:ServerResponse):Promise<void> {
    const body:string = JSON.stringify(await this.getPageContent());
    response.writeHead(OK, {
      'Content-Type': 'text/xml; charset=utf-8',
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });
    response.write(body);
    response.end();
  }

  private async getPageContent():Promise<PageData> {
    const { epid, port, uxpinDirPath } = this.context;
    const metadata:DesignSystemSnapshot = await getProjectMetadata(uxpinDirPath);
    return getPageData({ metadata, port, revisionId: epid.revisionId });
  }
}
