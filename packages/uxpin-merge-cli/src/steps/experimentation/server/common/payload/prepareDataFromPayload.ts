import { IncomingMessage } from 'http';
import { parse, ParsedUrlQuery } from 'querystring';

export function prepareDataFromPayload(request:IncomingMessage):Promise<any> {
  return new Promise((resolve, reject) => {
    let body:string = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });
    request.on('end', () => {
      if (body.startsWith('json')) {
        const data:ParsedUrlQuery = parse(body);
        resolve(JSON.parse(data.json as string));
      } else {
        resolve(JSON.parse(body));
      }
    });
    request.on('error', (error) => {
    	reject(error);
    });
  });
}
