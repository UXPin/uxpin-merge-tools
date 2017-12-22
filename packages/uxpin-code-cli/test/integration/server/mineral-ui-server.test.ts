import Chromeless from 'chromeless';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getComponentByName } from '../../utils/dom/getComponentByName';
import { setupDebugServerTest } from '../../utils/e2e/setupDebugServerTest';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('server run in mineral-ui', () => {
  let chromeless:Chromeless<any>;

  setupDebugServerTest({
    env: { UXPIN_BUILD: 'true' },
    projectPath: 'resources/repos/mineral-ui',
    serverCmdArgs: [
      '--webpack-config "./webpack.config.js"',
      '--wrapper "../src/themes/UXPinWrapper.js"',
    ],
  }, (c) => chromeless = c);

  it('opens `Dropdown` with correct styling on click', () => {
    // given
    const expectedDetails = { // tslint:disable-line
      itemContents: 'Danger variant',
      textColor: 'rgb(219, 41, 41)',
    };

    const getComponentDetails:() => typeof expectedDetails = () => {
      const dangerItemContentSelector:string = '#dropdown-1-menuItem-4 > span > span > span:first-child';
      const dropdownContentItem:HTMLElement = document.querySelector(dangerItemContentSelector) as HTMLElement;
      const dropdownItemStyles:CSSStyleDeclaration = getComputedStyle(dropdownContentItem);
      const itemContents:string = dropdownContentItem.innerText as string;
      return {
        itemContents,
        textColor: dropdownItemStyles.color as string,
      };
    };

    // when
    return chromeless
      .click('#dropdown-1 button')
      .evaluate(getComponentDetails).then((scratchedDetails) => {
        // then
        expect(scratchedDetails).toEqual(expectedDetails);
      });
  });

  it('renders `Card` component with `no code examples` warning', () => {
    const componentName:string = 'Card';

    const expectedHeader:string = '<h3>Card</h3>';
    const expectedExample:string = '⚠️ Warning: no code examples';

    // when
    return chromeless.evaluate(getComponentByName, componentName).then((contents) => {
      // then
      expect(contents).toContain(expectedHeader);
      expect(contents).toContain(expectedExample);
    });
  });
});
