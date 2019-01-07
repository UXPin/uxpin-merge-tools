import { ComponentCategoryInfo } from '../../../../../../discovery/component/category/ComponentCategoryInfo';
import { getSourceFileContentToBundle } from '../getSourceFileContentToBundle';

describe('getSourceFileContentToBundle', () => {
  it('should get file content for given presets', () => {
    // given
    const infos:ComponentCategoryInfo[] = [
      {
        componentInfos: [
          {
            dirPath: '',
            implementation : { framework: 'reactjs', lang: 'javascript', path: '' },
            presets: [
              { path: './src/components/Component1/presets/0-default.jsx' },
              { path: './src/components/Component1/presets/1-alternative.jsx' },
            ],
          },
        ],
        name: 'components',
      },
      {
        componentInfos: [
          {
            dirPath: '',
            implementation : { framework: 'reactjs', lang: 'javascript', path: '' },
            presets: [
              { path: './src/components/Component2/presets/0-default.jsx' },
            ],
          },
        ],
        name: 'layout',
      },
    ];

    // when
    const result:string = getSourceFileContentToBundle('./', infos);

    // then
    expect(result).toMatchSnapshot();
  });

  it('should get file content for empty presets list', () => {
    // given
    const infos:ComponentCategoryInfo[] = [];

    // when
    const result:string = getSourceFileContentToBundle('./', infos);

    // then
    expect(result).toMatchSnapshot();
  });
});
