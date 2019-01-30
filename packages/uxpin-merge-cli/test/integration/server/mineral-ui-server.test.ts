import Chromeless from 'chromeless';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getComponentByName } from '../../utils/dom/getComponentByName';
import { waitForComponent } from '../../utils/e2e/chromeless/waitForComponent';
import { setupDebugServerTest } from '../../utils/e2e/setupDebugServerTest';

const CURRENT_TIMEOUT:number = 600000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('server run in mineral-ui', () => {
  let chromeless:Chromeless<any>;

  setupDebugServerTest({
    projectPath: 'resources/repos/mineral-ui',
    serverCmdArgs: [
      '--webpack-config "./webpack.config.js"',
      '--wrapper "./src/library/themes/UXPinWrapper.js"',
    ],
  }, (c) => chromeless = c);

  it('opens `Dropdown` with correct styling on click', async () => {
    // given
    const expectedDetails = { // tslint:disable-line
      itemContents: 'Danger variant',
      textColor: 'rgb(222, 27, 27)',
    };

    const getComponentDetails:() => typeof expectedDetails = () => {
      const dangerItemContentSelector:string = '#dropdown-1-item-4 > span > span > span:first-child';
      const dropdownContentItem:HTMLElement = document.querySelector(dangerItemContentSelector) as HTMLElement;
      const dropdownItemStyles:CSSStyleDeclaration = getComputedStyle(dropdownContentItem);
      const itemContents:string = dropdownContentItem.innerText as string;
      return {
        itemContents,
        textColor: dropdownItemStyles.color as string,
      };
    };

    // when
    const scratchedDetails:any = await chromeless
      .wait('#dropdown-1 button', CURRENT_TIMEOUT)
      .scrollToElement('#dropdown-1 button')
      .click('#dropdown-1 button')
      .evaluate(getComponentDetails);

    // then
    expect(scratchedDetails).toEqual(expectedDetails);
  }, CURRENT_TIMEOUT);

  it('renders `Card` component with `no code examples` warning', async () => {
    const componentName:string = 'Card';

    const expectedHeader:string = '<h3 id="header-card">Card</h3>';
    const expectedExample:string = '⚠️ Warning: no code examples';

    // when
    await waitForComponent(chromeless, componentName, CURRENT_TIMEOUT);
    const contents:any = await chromeless.evaluate(getComponentByName, componentName);

    // then
    expect(contents).toContain(expectedHeader);
    expect(contents).toContain(expectedExample);
  }, CURRENT_TIMEOUT);
});
