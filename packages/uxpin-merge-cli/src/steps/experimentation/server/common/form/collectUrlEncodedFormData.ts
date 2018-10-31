import { IncomingMessage } from 'http';
import { parse } from 'querystring';

export function collectUrlEncodedFormData(request:IncomingMessage):Promise<any> {
  return new Promise((resolve) => {
    let body:string = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });
    request.on('end', () => {
      resolve(parse(body));
    });
  });
}
