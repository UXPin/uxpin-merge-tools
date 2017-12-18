import Chromeless from 'chromeless';
import ngrok = require('ngrok');
import { SERVER_URL } from '../../../../src/debug/server/serverConfig';
import { createChromeless } from './createChromeless';

export function keepChromelessWhileTestsRunning(port:number,
  onChromelessReady:(c:Chromeless<any>) => void,
  path?:string):void {
  let chromeless:Chromeless<any>;
  let urlToOpenByChromeless:string = `${SERVER_URL}:${port}`;

  if (process.env.CI) {
    beforeAll((done) => {
      ngrok.connect(port, (err, url) => {
        if (url) {
          urlToOpenByChromeless = url;
          done();
        }
      });
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

  afterAll(() => {
    chromeless.end();
  });
}
