import { IncomingMessage } from 'http';
import { parse, Url } from 'url';
import { NotFoundHandler } from '../handler/error/NotFoundHandler';
import { RequestHandler } from '../handler/RequestHandler';

export class ServerRouter {

  private handlers:Map<string, RequestHandler> = new Map();

  public register(uri:string, handler:RequestHandler):void {
    this.handlers.set(uri, handler);
  }

  public route(request:IncomingMessage):RequestHandler {
    const url:Url = parse(request.url!, true);
    let routeHandler:RequestHandler | undefined = this.handlers.get(url.pathname!);
    if (!routeHandler) {
      routeHandler = new NotFoundHandler();
    }
    return routeHandler;
  }
}
