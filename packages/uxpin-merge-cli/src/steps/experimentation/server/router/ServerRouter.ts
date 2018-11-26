import { IncomingMessage, ServerResponse } from 'http';
import { parse, Url } from 'url';
import { NotFoundHandler } from '../handler/error/NotFoundHandler';
import { OptionsRequestHandler } from '../handler/preflight/OptionsRequestHandler';
import { RequestHandler } from '../handler/RequestHandler';
import { provideRequestToHandler } from './provideRequestToHandler';

export class ServerRouter {

  private readonly optionsHandler:OptionsRequestHandler;
  private readonly notFoundHandler:NotFoundHandler;
  private handlers:PathHandlerItem[] = [];

  constructor() {
    this.notFoundHandler = new NotFoundHandler();
    this.optionsHandler = new OptionsRequestHandler();
  }

  public register(uri:string | RegExp, handler:RequestHandler):void {
    this.handlers.push({ uri, handler });
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    const handlerItem:HandlerItem = this.route(request);
    provideRequestToHandler(handlerItem, request, response);
  }

  private route(request:IncomingMessage):HandlerItem {
    if (request.method === 'OPTIONS') {
      return { handler: this.optionsHandler };
    }
    const url:Url = parse(request.url!, true);
    for (const handlerItem of this.handlers) {
      if (isPathnameMatchingUri(url.pathname!, handlerItem.uri)) {
        return handlerItem;
      }
    }
    return { handler: this.notFoundHandler };
  }
}

function isPathnameMatchingUri(pathname:string, uri:string | RegExp):boolean {
  if (typeof uri === 'string') {
    return uri === pathname;
  }
  return uri.test(pathname);
}

export interface HandlerItem {
  handler:RequestHandler;
  uri?:string | RegExp;
}

export interface PathHandlerItem extends HandlerItem {
  uri:string | RegExp;
}
