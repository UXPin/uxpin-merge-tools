import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { RequestHandler } from '../RequestHandler';

// tslint:disable prefer-function-over-method
export class OptionsRequestHandler implements RequestHandler {
  public handle(request:IncomingMessage, response:ServerResponse):void {
    response.writeHead(OK, {
      'Content-Type': 'text/plain',
      ...getAccessControlHeaders(request.headers),
    });
    response.end();
  }

}
