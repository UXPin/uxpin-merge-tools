import Chromeless from 'chromeless';

import { getRandomPortNumber } from '../../../src/debug/server/getRandomPortNumber';
import { SERVER_URL } from '../../../src/debug/server/serverConfig';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getComponentByName } from '../../utils/dom/getComponentByName';
import { keepServerWhileTestsRunning } from '../../utils/server/keepServerWhileTestsRunning';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

const port:number = getRandomPortNumber();
const options:string = [
  `--port ${port}`,
  '--webpack-config "../../configs/polaris-webpack.config.js"',
].join(' ');
keepServerWhileTestsRunning('resources/repos/polaris', options);

describe('server run in polaris', () => {
  const TIMEOUT:number = 200;
  let chromeless:Chromeless<any>;

  beforeAll((done) => {
    chromeless = new Chromeless();
    return chromeless
      .goto(`${SERVER_URL}:${port}/`)
      .wait(TIMEOUT)
      .then(done);
  });

  afterAll(() => chromeless.end());

  it('renders `Banner` component with preview', () => {
    // given
    const expectedDetails = { // tslint:disable-line
      backgroundColor: 'rgb(244, 246, 248)',
      bannerHeaderText: 'Order archived',
      borderRadius: '0px 0px 3px 3px',
    };

    const getComponentDetails:() => typeof expectedDetails = () => {
      const banner:Element = document.querySelector('[class*="Banner-Banner"]') as HTMLElement;
      const bannerStyles:CSSStyleDeclaration = getComputedStyle(banner);
      const bannerHeader:HTMLElement = (banner.querySelector('[class*="Banner-Heading"]') as HTMLElement);
      const bannerHeaderText:string = (bannerHeader.innerText as string).replace(/(\r\n|\n|\r)/gm, '');
      return {
        backgroundColor: bannerStyles.backgroundColor as string,
        bannerHeaderText,
        borderRadius: bannerStyles.borderRadius as string,
      };
    };

    // when
    return chromeless.evaluate(getComponentDetails).then((scratchedDetails) => {
      // then
      expect(scratchedDetails).toEqual(expectedDetails);
    });
  });

  it('renders `Popover` component with `this.props.onClose is not a function` error', () => {
    const componentName:string = 'Popover';

    const expectedHeader:string = '<h3>Popover</h3>';
    const expectedExample:string = '⛔ Error: this.props.onClose is not a function';

    // when
    return chromeless.evaluate(getComponentByName, componentName).then((contents) => {
      // then
      expect(contents).toContain(expectedHeader);
      expect(contents).toContain(expectedExample);
    });
  });

  it('renders `Breadcrumbs` component with `no code examples` warning', () => {
    const componentName:string = 'Breadcrumbs';

    const expectedHeader:string = '<h3>Breadcrumbs</h3>';
    const expectedExample:string = '⚠️ Warning: no code examples';

    // when
    return chromeless.evaluate(getComponentByName, componentName).then((contents) => {
      // then
      expect(contents).toContain(expectedHeader);
      expect(contents).toContain(expectedExample);
    });
  });
});
