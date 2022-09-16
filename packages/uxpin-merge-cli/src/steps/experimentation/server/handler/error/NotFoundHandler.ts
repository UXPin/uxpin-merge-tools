import { IncomingMessage, ServerResponse } from 'http';
import { NOT_FOUND } from 'http-status-codes';
import { RequestHandler } from '../RequestHandler';

// tslint:disable prefer-function-over-method
export class NotFoundHandler implements RequestHandler {
  public handle(request: IncomingMessage, response: ServerResponse): void {
    response.writeHead(NOT_FOUND, { 'Content-Type': 'text/plain' });
    response.write('Not found');
    response.end();
  }
}
