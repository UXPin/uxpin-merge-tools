import Chromeless from 'chromeless';
import { SERVER_URL } from '../../../../src/debug/server/serverConfig';
import { ngrok } from '../ngrok/ngrok';
import { createChromeless } from './createChromeless';

export function keepChromelessWhileTestsRunning(
  port: number,
  onChromelessReady: (c: Chromeless<any>) => void,
  path?: string
): void {
  let chromeless: Chromeless<any>;
  let urlToOpenByChromeless = `${SERVER_URL}:${port}`;

  beforeAll((done) => {
    chromeless = createChromeless(urlToOpenByChromeless, path);
    onChromelessReady(chromeless);
    done();
  });

  afterAll(async () => {
    await chromeless.end();
  });
}
