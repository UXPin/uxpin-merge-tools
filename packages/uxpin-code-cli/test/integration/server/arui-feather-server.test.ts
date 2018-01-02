import Chromeless from 'chromeless';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getComponentByName } from '../../utils/dom/getComponentByName';
import { setupDebugServerTest } from '../../utils/e2e/setupDebugServerTest';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('server run in arui-feather', () => {
  let chromeless:Chromeless<any>;

  setupDebugServerTest({
    projectPath: 'resources/repos/arui-feather',
    serverCmdArgs: ['--webpack-config "./webpack.gemini.config.js"'],
  }, (c) => chromeless = c);

  it('renders `Button` component with preview', () => {
    const componentName:string = 'Button';

    const expectedHeader:string = '<h3>Button</h3>';
    const expectedExample:string = `<button \
role="button" type="button" class="button button_size_s button_theme_alfa-on-white">\
<span class="button__text">Применить</span></button>`;

    // when
    return chromeless.evaluate(getComponentByName, componentName).then((contents) => {
      // then
      expect(contents).toContain(expectedHeader);
      expect(contents).toContain(expectedExample);
    });
  });

  it('renders `Calendar` component with `initialState is not defined` Error', () => {
    const componentName:string = 'Calendar';

    const expectedHeader:string = '<h3>Calendar</h3>';
    const expectedExample:string = '⛔ Error: initialState is not defined';

    // when
    return chromeless.evaluate(getComponentByName, componentName).then((contents) => {
      // then
      expect(contents).toContain(expectedHeader);
      expect(contents).toContain(expectedExample);
    });
  });

  it('renders `MaskedInput` component with `no code examples` warning', () => {
    const componentName:string = 'MaskedInput';

    const expectedHeader:string = '<h3>MaskedInput</h3>';
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
