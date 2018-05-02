import { join } from 'path';
import { testDirPath } from '../../../../../test/utils/resources/testDirPath';
import { ProjectPaths } from '../../paths/ProjectPaths';
import { ComponentInfo } from '../ComponentInfo';
import { getComponentInfo } from '../getComponentInfo';

describe('getComponentInfo', () => {
  describe('getting object describing component basics for given directory path and expected filename', () => {
    describe('when the component file exists in the given directory', () => {
      it('returns correct info object', () => {
        // given
        const paths:ProjectPaths = {
          componentsDirPath: 'src/components',
          projectRoot: join(testDirPath, 'resources/repos/nordnet-ui-kit'),
        };
        const componentName:string = 'button';
        const expectedInfo:ComponentInfo = {
          dirPath: 'src/components/button',
          documentation: {
            path: `src/components/button/button.md`,
          },
          implementation: {
            framework: 'reactjs',
            lang: 'javascript',
            path: 'src/components/button/button.jsx',
          },
          presets: [],
        };

        // when
        return getComponentInfo(paths, componentName).then((info) => {
          // then
          expect(info).toEqual(expectedInfo);
        });
      });
    });
  });
});
