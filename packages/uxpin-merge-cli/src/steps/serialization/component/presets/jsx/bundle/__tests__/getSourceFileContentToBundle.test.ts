import { ComponentPresetInfo } from '../../../../../../discovery/component/ComponentInfo';
import { getSourceFileContentToBundle } from '../getSourceFileContentToBundle';

describe('getSourceFileContentToBundle', () => {
  it('should get file content for given presets', () => {
    // given
    const infos:ComponentPresetInfo[] = [
      { path: './src/components/Component1/presets/0-default.jsx' },
      { path: './src/components/Component1/presets/1-alternative.jsx' },
      { path: './src/components/Component2/presets/0-default.jsx' },
    ];

    // when
    const result:string = getSourceFileContentToBundle(infos);

    // then
    expect(result).toMatchSnapshot();
  });

  it('should get file content for empty presets list', () => {
    // given
    const infos:ComponentPresetInfo[] = [];

    // when
    const result:string = getSourceFileContentToBundle(infos);

    // then
    expect(result).toMatchSnapshot();
  });
});
