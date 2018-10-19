import { IncomingMessage, ServerResponse } from 'http';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { RequestHandler } from '../RequestHandler';

export class ImplementationErrorHandler implements RequestHandler {

  constructor(private error:Error) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    response.writeHead(INTERNAL_SERVER_ERROR, { 'Content-Type': 'text/plain' });
    response.write(this.stringifyError());
    response.end();
  }

  private stringifyError():string {
    return `${this.error.name}: ${this.error.message}
${this.error.stack}`;
  }

}
