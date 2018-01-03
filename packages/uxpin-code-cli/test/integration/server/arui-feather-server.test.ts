import Chromeless from 'chromeless';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getComponentByName } from '../../utils/dom/getComponentByName';
import { waitForComponent } from '../../utils/e2e/chromeless/waitForComponent';
import { setupDebugServerTest } from '../../utils/e2e/setupDebugServerTest';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('server run in arui-feather', () => {
  let chromeless:Chromeless<any>;

  setupDebugServerTest({
    projectPath: 'resources/repos/arui-feather',
    serverCmdArgs: '--webpack-config "./webpack.gemini.config.js"',
  }, (c) => chromeless = c);

  it('renders `Button` component with preview', async () => {
    const componentName:string = 'Button';

    const expectedHeader:string = '<h3 id="header-button">Button</h3>';
    const expectedExample:string = `<button \
role="button" type="button" class="button button_size_s button_theme_alfa-on-color">\
<span class="button__text">Применить</span></button>`;

    // when
    await chromeless.wait('button.button.button_size_s', CURRENT_TIMEOUT);
    const contents:any = await chromeless.evaluate(getComponentByName, componentName);

    // then
    expect(contents).toContain(expectedHeader);
    expect(contents).toContain(expectedExample);
  }, CURRENT_TIMEOUT);

  it('renders `Calendar` component with `initialState is not defined` Error', async () => {
    const componentName:string = 'Calendar';

    const expectedHeader:string = '<h3 id="header-calendar">Calendar</h3>';
    const expectedExample:string = '⛔ Error: initialState is not defined';

    // when
    await waitForComponent(chromeless, componentName);
    const contents:any = await chromeless.evaluate(getComponentByName, componentName);

    // then
    expect(contents).toContain(expectedHeader);
    expect(contents).toContain(expectedExample);
  });

  it('renders `Header` component with `no code examples` warning', async () => {
    const componentName:string = 'Header';

    const expectedHeader:string = '<h3 id="header-header">Header</h3>';
    const expectedExample:string = '⚠️ Warning: no code examples';

    // when
    await waitForComponent(chromeless, componentName);
    const contents:any = await chromeless.evaluate(getComponentByName, componentName);

    // then
    expect(contents).toContain(expectedHeader);
    expect(contents).toContain(expectedExample);
  });

  it('does not render non-existent component', async () => {
    const componentName:string = 'NotExist';

    // when
    const contents:any = await chromeless.evaluate(getComponentByName, componentName);

    // then
    expect(contents).toBeFalsy();
  });
});
