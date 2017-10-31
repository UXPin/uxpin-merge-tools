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
  '--webpack-config "./webpack.gemini.config.js"',
].join(' ');
keepServerWhileTestsRunning('resources/repos/arui-feather', options);

describe('server run in arui-feather', () => {
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

  it('renders `Button` component with preview', () => {
    const componentName:string = 'Button';

    const expectedHeader:string = '<h3>Button</h3>';
    const expectedExample:string = `<button \
role="button" type="button" class="button button_size_s button_theme_alfa-on-color">\
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
