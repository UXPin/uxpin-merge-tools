import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { getNoCacheHeaders } from '../../headers/getNoCacheHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { RequestHandler } from '../RequestHandler';

export class GetLibrariesIndexHandler implements RequestHandler {
  constructor(private context:ExperimentationServerContext) {}

  public handle(request:IncomingMessage, response:ServerResponse):void {
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(this.context.uxpinDomain),
      ...getNoCacheHeaders(),
    });
    response.write('[]');
    response.end();
  }
}
