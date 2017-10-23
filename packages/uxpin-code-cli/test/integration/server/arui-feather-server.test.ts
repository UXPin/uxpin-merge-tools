import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { evalInBrowser } from '../../utils/server/evalInBrowser';
import { keepServerWhileTestsRunning } from '../../utils/server/keepServerWhileTestsRunning';

const CURRENT_TIMEOUT:number = 180000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

keepServerWhileTestsRunning('resources/repos/arui-feather', '--webpack-config "./webpack.gemini.config.js"');

describe('server run in arui-feather', () => {
  it('runs gets up successfully', () => {
    return evalInBrowser(() => document.body.innerText).then((contents) => {
      expect(contents).toEqual('It works!');
    });
  });
});
