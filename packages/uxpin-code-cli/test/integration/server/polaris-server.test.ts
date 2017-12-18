import Chromeless from 'chromeless';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getComponentByName } from '../../utils/dom/getComponentByName';
import { setupDebugServerTest } from '../../utils/e2e/setupDebugServerTest';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('server run in polaris', () => {
  let chromeless:Chromeless<any>;

  setupDebugServerTest({
    projectPath: 'resources/repos/polaris',
    serverCmdArgs: '--webpack-config "./playground/webpack.config"',
  }, (c) => chromeless = c);

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
