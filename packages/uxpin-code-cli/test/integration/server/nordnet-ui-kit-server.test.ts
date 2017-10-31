import Chromeless from 'chromeless';

import { getRandomPortNumber } from '../../../src/server/getRandomPortNumber';
import { SERVER_URL } from '../../../src/server/serverConfig';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getComponentByName } from '../../utils/dom/getComponentByName';
import { keepServerWhileTestsRunning } from '../../utils/server/keepServerWhileTestsRunning';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

const port:number = getRandomPortNumber();
const options:string = [
  `--port ${port}`,
  '--webpack-config "../../configs/nordnet-ui-kit-webpack.config.js"',
  '--wrapper "../documentation/wrapper.jsx"',
].join(' ');
keepServerWhileTestsRunning('resources/repos/nordnet-ui-kit', options);

describe('server run in nordnet-ui-kit', () => {
  const TIMEOUT:number = 1000;
  let chromeless:Chromeless<any>;

  beforeAll((done) => {
    chromeless = new Chromeless();
    return chromeless
      .goto(`${SERVER_URL}:${port}/`)
      .wait(TIMEOUT)
      .then(done);
  });

  afterAll(() => chromeless.end());

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
