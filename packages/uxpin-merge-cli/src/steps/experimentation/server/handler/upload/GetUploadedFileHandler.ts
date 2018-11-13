import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { handleImplementationError } from '../error/handleImplementationError';
import { RequestHandler } from '../RequestHandler';

export class GetUploadedFileHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    this.getUploadedFile(request, response).catch((error) => handleImplementationError(response, error));
  }

  private async getUploadedFile(request:IncomingMessage, response:ServerResponse):Promise<void> {
    response.writeHead(OK, {
      'Content-Type': 'text/xml; charset=utf-8',
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });
    response.end('');
  }

}
