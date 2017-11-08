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
    serverCmdArgs: '--webpack-config "../../configs/polaris-webpack.config.js"',
  }, (c) => chromeless = c);

  it('renders `Banner` component with preview', () => {
    const componentName:string = 'Banner';

    const expectedHeader:string = '<h3>Banner</h3>';
    const expectedExample:string = `<div>\
<div id="Banner1Heading">\
<p>Order archived</p>\
</div>\
<div id="Banner1Content">\
<p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>\
</div>\
</div>`;

    // when
    return chromeless.evaluate(getComponentByName, componentName).then((contents) => {
      // then
      expect(contents).toContain(expectedHeader);
      expect(contents).toContain(expectedExample);
    });
  });

  it('renders `Icon` component with preview', () => {
    const componentName:string = 'Icon';

    const expectedHeader:string = '<h3>Icon</h3>';
    const expectedExample:string = `<svg viewBox="0 0 20 20">\
<path d="M15 11h-4v4H9v-4H5V9h4V5h2v4h4v2zm-5-9a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" fill-rule="evenodd"></path></svg>`;

    // when
    return chromeless.evaluate(getComponentByName, componentName).then((contents) => {
      // then
      expect(contents).toContain(expectedHeader);
      expect(contents).toContain(expectedExample);
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
