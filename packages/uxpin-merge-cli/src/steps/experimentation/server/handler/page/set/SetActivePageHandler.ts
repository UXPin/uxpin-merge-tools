import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { PageData } from '../../../../../../common/types/PageData';
import { getPageData } from '../../../common/page/data/getPageData';
import { getAccessControlHeaders } from '../../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../../startExperimentationServer';
import { handleImplementationError } from '../../error/handleImplementationError';
import { RequestHandler } from '../../RequestHandler';

export class SetActivePageHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    this.respondWithPageContent(response, request.headers).catch((error) => handleImplementationError(response, error));
  }

  private async respondWithPageContent(response:ServerResponse, headers:IncomingHttpHeaders):Promise<void> {
    const body:string = JSON.stringify(await this.getPageData());
    response.writeHead(OK, {
      'Content-Type': 'text/xml; charset=utf-8',
      ...getAccessControlHeaders(headers),
    });
    response.write(body);
    response.end();
  }

  private async getPageData():Promise<PageData> {
    const { epid, ngrokSessionId, port, uxpinDirPath } = this.context;
    return await getPageData({ ngrokSessionId, port, revisionId: epid.revisionId, uxpinDirPath });
  }
}
