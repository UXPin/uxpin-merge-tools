import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { evalInBrowser } from '../../utils/server/evalInBrowser';
import { keepServerWhileTestsRunning } from '../../utils/server/keepServerWhileTestsRunning';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

const options:string = [
  '--webpack-config "../../configs/nordnet-ui-kit-webpack.config.js"',
  '--wrapper "../documentation/wrapper.jsx"',
].join(' ');
keepServerWhileTestsRunning('resources/repos/nordnet-ui-kit', options);

describe('server run in nordnet-ui-kit', () => {
  it('runs gets up successfully', () => {
    return evalInBrowser(() => document.body.innerText).then((contents) => {
      expect(contents).toEqual('It works!');
    });
  });
});
