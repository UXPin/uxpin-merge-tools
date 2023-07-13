import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { getNoCacheHeaders } from '../../headers/getNoCacheHeaders';
import { RequestHandler } from '../RequestHandler';

export class GetLibrariesIndexHandler implements RequestHandler {
  public handle(request: IncomingMessage, response: ServerResponse): void {
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(request.headers),
      ...getNoCacheHeaders(),
    });
    response.write('[]');
    response.end();
  }
}
