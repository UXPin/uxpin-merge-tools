import Chromeless from 'chromeless';
import ngrok = require('ngrok');
import { createChromeless } from './createChromeless';

export function keepChromelessWhileTestsRunning(port:number,
  onChromelessReady:(c:Chromeless<any>) => void,
  path?:string):void {
  let chromeless:Chromeless<any>;
  let uniqueUrl:string;

  beforeAll((done) => {
    ngrok.connect(port, (err, url) => {
      if (url) {
        uniqueUrl = url;
        chromeless = createChromeless(url, path);
        onChromelessReady(chromeless);
        done();
      }
    });
  });

  afterAll(() => {
    chromeless.end();
    ngrok.disconnect(uniqueUrl);
  });
}
