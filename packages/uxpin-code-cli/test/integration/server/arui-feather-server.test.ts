import Chromeless from 'chromeless';

import { SERVER_URL } from '../../../src/server/serverConfig';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { keepServerWhileTestsRunning } from '../../utils/server/keepServerWhileTestsRunning';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

keepServerWhileTestsRunning('resources/repos/arui-feather', '--webpack-config "./webpack.gemini.config.js"');

describe('server run in arui-feather', () => {
  const TIMEOUT:number = 200;
  let chromeless:Chromeless<any>;

  beforeAll((done) => {
    chromeless = new Chromeless();
    return chromeless
      .goto(SERVER_URL)
      .wait(TIMEOUT)
      .then(done);
  });

  afterAll(() => chromeless.end());

  it('renders `Button` component with preview', () => {
    const componentName:string = 'Button';

    const expectedHeader:string = '<h3>Button</h3>';
    const expectedExample:string = '<button role="button" type="button" class="button button_size_s button_theme_alfa-on-color"><span class="button__text">Применить</span></button>';

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

  it('renders `Header` component with `no code examples` warning', () => {
    const componentName:string = 'Header';

    const expectedHeader:string = '<h3>Header</h3>';
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

function getComponentByName(name:string):string | null {
  const node:HTMLElement | undefined = Array.from(document.querySelectorAll<'header'>('h3' as 'header'))
    .find((el) => el.innerText === name);

  if (!node) {
    return null;
  }

  if (!node.parentElement) {
    return null;
  }

  return node.parentElement.innerHTML;
}
