import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { RequestHandler } from '../../RequestHandler';

// tslint:disable prefer-function-over-method
export class PageSaveHandler implements RequestHandler {

  public handle(request:IncomingMessage, response:ServerResponse):void {
    response.writeHead(OK, { 'Content-Type': 'text/plain' });
    response.write('');
    response.end();
  }

}
