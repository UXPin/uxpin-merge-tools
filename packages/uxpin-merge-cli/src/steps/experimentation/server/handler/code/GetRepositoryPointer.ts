import { IncomingMessage, ServerResponse } from 'http';
import { NO_CONTENT } from 'http-status-codes';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { RequestHandler } from '../RequestHandler';

export class GetRepositoryPointer implements RequestHandler {
  constructor(private context:ExperimentationServerContext) {}

  public handle(request:IncomingMessage, response:ServerResponse):void {
    response.writeHead(NO_CONTENT, {
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });
    response.end();
  }
}
