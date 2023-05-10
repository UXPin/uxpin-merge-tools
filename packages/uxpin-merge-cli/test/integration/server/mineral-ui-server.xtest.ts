import Chromeless from 'chromeless';
import { Environment } from '../../../src/program/env/Environment';
import { mineralUiServerStub } from '../../resources/stubs/mineralUi';
import { getComponentByName } from '../../utils/dom/getComponentByName';
import { waitForComponent } from '../../utils/e2e/chromeless/waitForComponent';
import { getRandomPortNumber } from '../../utils/e2e/server/getRandomPortNumber';
import { setupDebugServerTest } from '../../utils/e2e/setupDebugServerTest';
import {
  ADMIN_PORT_RANGE,
  startStubbyServer,
  STUBS_PORT_RANGE,
  TLS_PORT_RANGE,
} from '../../utils/stubby/startStubbyServer';
import { stopStubbyServer } from '../../utils/stubby/stopStubbyServer';

const CURRENT_TIMEOUT = 600000;

describe('server run in mineral-ui', () => {
  let chromeless: Chromeless<any>;
  let server: any;
  const tlsPort: number = getRandomPortNumber(TLS_PORT_RANGE.min, TLS_PORT_RANGE.max);

  beforeAll(async () => {
    server = await startStubbyServer({
      admin: getRandomPortNumber(ADMIN_PORT_RANGE.min, ADMIN_PORT_RANGE.max),
      data: mineralUiServerStub,
      stubs: getRandomPortNumber(STUBS_PORT_RANGE.min, STUBS_PORT_RANGE.max),
      tls: tlsPort,
    });
  }, CURRENT_TIMEOUT);

  setupDebugServerTest(
    {
      env: {
        UXPIN_API_DOMAIN: `0.0.0.0:${tlsPort}`,
        UXPIN_ENV: Environment.TEST,
      },
      projectPath: 'resources/repos/mineral-ui',
      serverCmdArgs: ['--webpack-config "./webpack.config.js"', '--wrapper "./src/library/themes/UXPinWrapper.js"'],
    },
    (c) => (chromeless = c)
  );

  afterAll(async () => {
    await stopStubbyServer(server);
  });

  it(
    'opens `Dropdown` with correct styling on click',
    async () => {
      // given
      const expectedDetails = {
        // tslint:disable-line
        itemContents: 'Danger variant',
        textColor: 'rgb(222, 27, 27)',
      };

      const getComponentDetails: () => typeof expectedDetails = () => {
        const dangerItemContentSelector = '#dropdown-1-item-4 > span > span > span:first-child';
        const dropdownContentItem: HTMLElement = document.querySelector(dangerItemContentSelector) as HTMLElement;
        const dropdownItemStyles: CSSStyleDeclaration = getComputedStyle(dropdownContentItem);
        const itemContents: string = dropdownContentItem.innerText as string;
        return {
          itemContents,
          textColor: dropdownItemStyles.color as string,
        };
      };

      // when
      const scratchedDetails: any = await chromeless
        .wait('#dropdown-1 button', CURRENT_TIMEOUT)
        .scrollToElement('#dropdown-1 button')
        .click('#dropdown-1 button')
        .evaluate(getComponentDetails);

      // then
      expect(scratchedDetails).toEqual(expectedDetails);
    },
    CURRENT_TIMEOUT
  );

  it(
    'renders `Card` component with `no code examples` warning',
    async () => {
      const componentName = 'Card';

      const expectedHeader = '<h3 id="header-card">Card</h3>';
      const expectedExample = '⚠️ Warning: no code examples';

      // when
      await waitForComponent(chromeless, componentName, CURRENT_TIMEOUT);
      const contents: any = await chromeless.evaluate(getComponentByName, componentName);

      // then
      expect(contents).toContain(expectedHeader);
      expect(contents).toContain(expectedExample);
    },
    CURRENT_TIMEOUT
  );
});
