import { IncomingMessage, ServerResponse } from 'http';
import { isRegExp } from 'lodash';
import { parse } from 'url';
import { HandlerItem } from './ServerRouter';

export function provideRequestToHandler(
  { handler, uri }:HandlerItem,
  request:IncomingMessage,
  response:ServerResponse,
):void {
  if (!isRegExp(uri)) {
    return handler.handle(request, response, []);
  }
  const pathname:string = parse(request.url!, true).pathname!;
  const regexResult:RegExpExecArray | null = uri.exec(pathname);
  if (!regexResult) {
    return handler.handle(request, response, []);
  }
  const [, ...uriParams] = regexResult;
  return handler.handle(request, response, uriParams);
}
