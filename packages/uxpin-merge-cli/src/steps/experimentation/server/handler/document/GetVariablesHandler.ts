import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { handleImplementationError } from '../error/handleImplementationError';
import { RequestHandler } from '../RequestHandler';

// tslint:disable prefer-function-over-method
export class GetVariablesHandler implements RequestHandler {

  // tslint:disable-next-line:no-unused-variable
  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    this.handleGetRequest(request, response).catch((error) => handleImplementationError(response, error));
  }

  private async handleGetRequest(request:IncomingMessage, response:ServerResponse):Promise<void> {
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(request.headers),
    });
    response.write('[]');
    response.end();
  }
}
