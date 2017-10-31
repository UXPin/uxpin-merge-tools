import Chromeless from 'chromeless';
import { SERVER_URL } from '../../../src/debug/server/serverConfig';
import { createChromeless } from '../e2e/chromeless/createChromeless';

export function chromelessNavigateToDebugServerAt<T>(port:number,
  onChromelessReady:(c:Chromeless<T>) => void,
  path?:string):void {
  getChromelessTargetUrl(port)
    .then((publicUrl) => onChromelessReady(createChromeless(publicUrl, path)))
    .catch((e) => console.log(e));
}

function getChromelessTargetUrl(port:number):Promise<string> {
  if (process.env.CI) {
    return getPublicUrl(SERVER_URL, port);
  }
  return Promise.resolve(`${SERVER_URL}:${port}`);
}
