import { IncomingMessage, ServerResponse } from 'http';

export interface RequestHandler {
  handle(request:IncomingMessage, response:ServerResponse, uriParams:string[]):void;
}
