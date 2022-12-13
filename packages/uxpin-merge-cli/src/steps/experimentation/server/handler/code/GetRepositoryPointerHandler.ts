import { IncomingMessage, ServerResponse } from 'http';
import { NO_CONTENT } from 'http-status-codes';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { RequestHandler } from '../RequestHandler';

// tslint:disable prefer-function-over-method
export class GetRepositoryPointerHandler implements RequestHandler {
  public handle(request: IncomingMessage, response: ServerResponse): void {
    response.writeHead(NO_CONTENT, {
      ...getAccessControlHeaders(request.headers),
    });
    response.end();
  }
}
