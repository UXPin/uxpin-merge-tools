import Chromeless from 'chromeless';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getComponentByName } from '../../utils/dom/getComponentByName';
import { setupDebugServerTest } from '../../utils/e2e/setupDebugServerTest';

const CURRENT_TIMEOUT = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

const serverCmdArgs: string[] = [
  '--webpack-config "../../configs/nordnet-ui-kit-webpack.config.js"',
  '--wrapper "./documentation/wrapper.jsx"',
  '--config="../../configs/nordnet-ui-kit-uxpin.config.js"',
];

xdescribe('server run in nordnet-ui-kit', () => {
  let chromeless: Chromeless<any>;

  setupDebugServerTest(
    {
      projectPath: 'resources/repos/nordnet-ui-kit',
      serverCmdArgs,
    },
    (c) => (chromeless = c)
  );

  it(
    'renders `Button` component with `no code examples` warning',
    async () => {
      const componentName = 'Button';

      const expectedHeader = '<h3 id="header-button">Button</h3>';
      const expectedExample = '⚠️ Warning: no code examples';

      // when
      chromeless.wait('#header-button + span', CURRENT_TIMEOUT);
      const contents: any = await chromeless.evaluate(getComponentByName, componentName);

      // then
      expect(contents).toContain(expectedHeader);
      expect(contents).toContain(expectedExample);
    },
    CURRENT_TIMEOUT
  );

  it('does not render non-existent component', async () => {
    const componentName = 'NotExist';

    // when
    const contents: any = await chromeless.evaluate(getComponentByName, componentName);

    // then
    expect(contents).toBeFalsy();
  });
});
