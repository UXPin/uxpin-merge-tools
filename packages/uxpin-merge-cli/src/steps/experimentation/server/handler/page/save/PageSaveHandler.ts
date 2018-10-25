import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { getAccessControlHeaders } from '../../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../../startExperimentationServer';
import { RequestHandler } from '../../RequestHandler';

export const PAGE_FILE_NAME:string = 'page.json';

// tslint:disable prefer-function-over-method
export class PageSaveHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });
    response.write('{}');
    response.end();
  }

}
