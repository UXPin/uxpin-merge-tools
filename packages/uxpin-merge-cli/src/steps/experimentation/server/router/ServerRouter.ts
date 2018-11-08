import { IncomingMessage } from 'http';
import { parse, Url } from 'url';
import { NotFoundHandler } from '../handler/error/NotFoundHandler';
import { OptionsRequestHandler } from '../handler/preflight/OptionsRequestHandler';
import { RequestHandler } from '../handler/RequestHandler';

export class ServerRouter {

  private readonly optionsHandler:OptionsRequestHandler;
  private readonly notFoundHandler:NotFoundHandler;
  private handlers:Map<string, RequestHandler> = new Map();

  constructor() {
    this.notFoundHandler = new NotFoundHandler();
    this.optionsHandler = new OptionsRequestHandler();
  }

  public register(uri:string, handler:RequestHandler):void {
    this.handlers.set(uri, handler);
  }

  public route(request:IncomingMessage):RequestHandler {
    const url:Url = parse(request.url!, true);
    if (request.method === 'OPTIONS') {
      return this.optionsHandler;
    }
    return this.handlers.get(url.pathname!) || this.notFoundHandler;
  }
}
