import Chromeless from 'chromeless';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getComponentByName } from '../../utils/dom/getComponentByName';
import { waitForComponent } from '../../utils/e2e/chromeless/waitForComponent';
import { setupDebugServerTest } from '../../utils/e2e/setupDebugServerTest';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('server run in polaris', () => {
  let chromeless:Chromeless<any>;

  setupDebugServerTest({
    projectPath: 'resources/repos/polaris',
    serverCmdArgs: '--webpack-config "./playground/webpack.config"',
  }, (c) => chromeless = c);

  it('renders `Banner` component with preview', async () => {
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
    await chromeless.wait('[class*="Banner-Banner"]', CURRENT_TIMEOUT);
    const scratchedDetails:any = await chromeless.evaluate(getComponentDetails);

    // then
    expect(scratchedDetails).toEqual(expectedDetails);
  }, CURRENT_TIMEOUT);

  it('renders `Popover` component with `this.props.onClose is not a function` error', async () => {
    const componentName:string = 'Popover';

    const expectedHeader:string = '<h3 id="header-popover">Popover</h3>';
    const expectedExample:string = '⛔ Error: this.props.onClose is not a function';

    // when
    await waitForComponent(chromeless, componentName, CURRENT_TIMEOUT);
    const contents:any = await chromeless.evaluate(getComponentByName, componentName);

    // then
    expect(contents).toContain(expectedHeader);
    expect(contents).toContain(expectedExample);
  }, CURRENT_TIMEOUT);

  it('renders `Breadcrumbs` component with `no code examples` warning', async () => {
    const componentName:string = 'Breadcrumbs';

    const expectedHeader:string = '<h3 id="header-breadcrumbs">Breadcrumbs</h3>';
    const expectedExample:string = '⚠️ Warning: no code examples';

    // when
    await waitForComponent(chromeless, componentName);
    const contents:any = await chromeless.evaluate(getComponentByName, componentName);

    // then
    expect(contents).toContain(expectedHeader);
    expect(contents).toContain(expectedExample);
  });
});
