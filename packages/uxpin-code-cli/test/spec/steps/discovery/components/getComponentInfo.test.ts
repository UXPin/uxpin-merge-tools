import { join } from 'path';
import { ComponentInfo } from '../../../../../src/steps/discovery/components/ComponentInfo';
import { getComponentInfo } from '../../../../../src/steps/discovery/components/getComponentInfo';
import { ProjectPaths } from '../../../../../src/steps/discovery/paths/ProjectPaths';
import { testDirPath } from '../../../../utils/resources/testDirPath';

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
          implementation: {
            framework: 'reactjs',
            lang: 'javascript',
            path: 'src/components/button/button.jsx',
          },
          name: 'button',
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
