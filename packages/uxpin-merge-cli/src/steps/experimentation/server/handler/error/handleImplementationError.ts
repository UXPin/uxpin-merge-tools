import { ServerResponse } from 'http';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

export function handleImplementationError(response:ServerResponse, error:Error):void {
  response.writeHead(INTERNAL_SERVER_ERROR, { 'Content-Type': 'text/plain' });
  response.write(stringifyError(error));
  response.end();
}

function stringifyError(error:Error):string {
  return `${error.name}: ${error.message}
${error.stack}`;
}
