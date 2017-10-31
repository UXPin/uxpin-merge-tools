import Chromeless from 'chromeless';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getComponentByName } from '../../utils/dom/getComponentByName';
import { setupDebugServerTest } from '../../utils/e2e/setupDebugServerTest';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

const serverCmdArgs:string = [
  '--webpack-config "../../configs/nordnet-ui-kit-webpack.config.js"',
  '--wrapper "../documentation/wrapper.jsx"',
].join(' ');

describe('server run in nordnet-ui-kit', () => {
  let chromeless:Chromeless<any>;

  setupDebugServerTest({
    projectPath: 'resources/repos/nordnet-ui-kit',
    serverCmdArgs,
  }, (c) => chromeless = c);

  it('renders `Button` component with `no code examples` warning', () => {
    const componentName:string = 'Button';

    const expectedHeader:string = '<h3>Button</h3>';
    const expectedExample:string = '⚠️ Warning: no code examples';

    // when
    return chromeless.evaluate(getComponentByName, componentName).then((contents) => {
      // then
      expect(contents).toContain(expectedHeader);
      expect(contents).toContain(expectedExample);
    });
  });

  it('does not render non-existent component', () => {
    const componentName:string = 'NotExist';

    // when
    return chromeless.evaluate(getComponentByName, componentName).then((contents) => {
      // then
      expect(contents).toBeFalsy();
    });
  });
});
