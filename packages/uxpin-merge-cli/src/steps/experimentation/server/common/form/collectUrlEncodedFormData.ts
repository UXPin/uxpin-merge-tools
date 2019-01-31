import { IncomingMessage } from 'http';
import { parse } from 'querystring';

export function collectUrlEncodedFormData(request:IncomingMessage):Promise<any> {
  return new Promise((resolve, reject) => {
    let body:string = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });
    request.on('end', () => {
      if (body.substring(0, 4) == "json") {
        resolve(JSON.parse(parse(body)).json);
      } else {
        resolve(JSON.parse(body));
      }
    });
    request.on('error', (error) => {
    	reject(error);
    });
  });
}
