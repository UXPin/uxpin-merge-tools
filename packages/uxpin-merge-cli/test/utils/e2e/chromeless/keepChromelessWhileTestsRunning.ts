import Chromeless from 'chromeless';
import { SERVER_URL } from '../../../../src/debug/server/serverConfig';
import { connectAsync } from '../../../../src/utils/ngrok/connectAsync';
import { ngrok } from '../ngrok/ngrok';
import { createChromeless } from './createChromeless';

export function keepChromelessWhileTestsRunning(port:number,
  onChromelessReady:(c:Chromeless<any>) => void,
  path?:string):void {
  let chromeless:Chromeless<any>;
  let urlToOpenByChromeless:string = `${SERVER_URL}:${port}`;

  if (process.env.CI) {
    beforeAll(async () => {
      urlToOpenByChromeless = await connectAsync(port);
    });

    afterAll(() => {
      ngrok.disconnect(urlToOpenByChromeless);
    });
  }

  beforeAll((done) => {
    chromeless = createChromeless(urlToOpenByChromeless, path);
    onChromelessReady(chromeless);
    done();
  });

  afterAll(async () => {
    await chromeless.end();
  });
}
