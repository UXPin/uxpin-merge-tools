import { ComponentPaths } from '../ComponentPaths';
import { getComponentPaths } from '../getComponentPaths';

describe('getComponentPaths', () => {
  it('component path details for given implementation path', () => {
    // given
    const implPath = 'relative/components/My/MyComponent.jsx';
    const projectRoot = '/users/Projects/myProject';
    const expectedPaths: ComponentPaths = {
      componentDirName: 'My',
      componentDirPath: 'relative/components/My',
      projectRoot,
    };

    // when
    const result: ComponentPaths = getComponentPaths(projectRoot, implPath);

    // then
    expect(result).toEqual(expectedPaths);
  });
});
