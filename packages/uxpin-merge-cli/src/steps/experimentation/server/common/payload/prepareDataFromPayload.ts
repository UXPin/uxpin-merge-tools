import { IncomingMessage } from 'http';
import { parse } from 'querystring';

interface ParsedFormData {
  json:string;
}

export function prepareDataFromPayload(request:IncomingMessage):Promise<any> {
  return new Promise((resolve, reject) => {
    let body:string = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });
    request.on('end', () => {
      if (body.startsWith('json')) {
        // @ts-ignore
        const data:ParsedFormData = parse(body);
        resolve(JSON.parse(data.json));
      } else {
        resolve(JSON.parse(body));
      }
    });
    request.on('error', (error) => {
    	reject(error);
    });
  });
}
