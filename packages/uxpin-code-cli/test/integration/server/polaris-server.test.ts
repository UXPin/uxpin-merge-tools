import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { evalInBrowser } from '../../utils/e2e/chromeless/evalInBrowser';
import { keepServerWhileTestsRunning } from '../../utils/e2e/server/keepServerWhileTestsRunning';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

keepServerWhileTestsRunning('resources/repos/polaris', '--webpack-config "../../configs/polaris-webpack.config.js"');

describe('server run in polaris', () => {
  it('runs gets up successfully', () => {
    return evalInBrowser(() => document.body.innerText).then((contents) => {
      expect(contents).toEqual('It works!');
    });
  });
});
