import Chromeless from 'chromeless';
import { SERVER_URL } from '../../../src/server/serverConfig';
import { tapPromise } from '../../../src/utils/promise/tapPromise';
import { startUXPinCodeServer } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 180000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

let closeServer:() => void;
beforeAll((done) => {
  const options:string = '--webpack-config "../../configs/polaris-webpack.config.js"';
  return startUXPinCodeServer('resources/repos/polaris', options).then((close) => {
    closeServer = close;
    done();
  });
});

afterAll(() => closeServer());

describe('polarisServer', () => {
  it('runs gets up successfully', () => {
    return getCLIServerBodyContents().then((contents) => {
      expect(contents).toEqual('It works!');
    });
  });
});

function getCLIServerBodyContents():Promise<string> {
  const chromeless:Chromeless<any> = new Chromeless();
  const TIMEOUT:number = 200;

  return chromeless
    .goto(SERVER_URL)
    .wait(TIMEOUT)
    .evaluate(() => document.body.innerText)
    .then(tapPromise((content:string) => chromeless.end()));
}
