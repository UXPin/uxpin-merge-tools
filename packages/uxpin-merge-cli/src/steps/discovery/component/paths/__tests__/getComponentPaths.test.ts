import { ComponentPaths } from '../ComponentPaths';
import { getComponentPaths } from '../getComponentPaths';

describe('getComponentPaths', () => {
  it('component path details for given implementation path', () => {
    // given
    const implPath:string = 'relative/components/My/MyComponent.jsx';
    const projectRoot:string = '/users/Projects/myProject';
    const expectedPaths:ComponentPaths = {
      componentDirName: 'My',
      componentDirPath: 'relative/components/My',
      implementationPath: implPath,
      projectRoot,
    };

    // when
    const result:ComponentPaths = getComponentPaths(projectRoot, implPath);

    // then
    expect(result).toEqual(expectedPaths);
  });
});
