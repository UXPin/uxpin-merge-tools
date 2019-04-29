import { ComponentDefinition } from '../../../../ComponentDefinition';
import { getSourceFileContentToBundle } from '../getSourceFileContentToBundle';

describe('getSourceFileContentToBundle', () => {
  it('should get file content for given presets', () => {
    // given
    const components:ComponentDefinition[] = [
      {
        documentation: { examples: [] },
        info: {
          dirPath: '',
          implementation : { framework: 'reactjs', lang: 'javascript', path: '' },
          presets: [
            { path: './src/components/Component1/presets/0-default.jsx' },
            { path: './src/components/Component1/presets/1-alternative.jsx' },
          ],
        },
        name: 'Component1',
        presets: [],
        properties: [],
      },
      {
        documentation: { examples: [] },
        info: {
          dirPath: '',
          implementation : { framework: 'reactjs', lang: 'javascript', path: '' },
          presets: [
            { path: './src/components/Component2/presets/0-default.jsx' },
          ],
        },
        name: 'Component2',
        presets: [],
        properties: [],
      },
    ];

    // when
    const result:string = getSourceFileContentToBundle('./', components);

    // then
    expect(result).toMatchSnapshot();
  });

  it('should get file content for empty presets list', () => {
    // given
    const components:ComponentDefinition[] = [];

    // when
    const result:string = getSourceFileContentToBundle('./', components);

    // then
    expect(result).toMatchSnapshot();
  });
});
