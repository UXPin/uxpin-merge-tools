import { getFileString } from '../../../../src/building/library/getFileString';
import { ComponentImplementationInfo, ComponentInfo } from '../../../../src/components/ComponentInfo';

describe('getFileString', () => {

  const implementation:ComponentImplementationInfo = { path: '', framework: 'reactjs', lang: 'javascript' };

  it('returns content of library file for list of ComponentInfo', () => {
    const componentInfos:ComponentInfo[] = [
      {
        dirPath: 'components/button',
        implementation,
        name: 'button',
      },
      {
        dirPath: 'components/button-list',
        implementation,
        name: 'button-list',
      },
    ];

    const expectedFileString:string = `import Button from '../src/components/button/button';
import ButtonList from '../src/components/button-list/button-list';
export {
  Button,
  ButtonList,
};`;

    // when
    const result:string = getFileString(componentInfos);

    // then
    expect(result).toEqual(expectedFileString);
  });

  it('returns content of library file for list of ComponentInfo and path of custom wrapper', () => {
    const componentInfos:ComponentInfo[] = [
      {
        dirPath: 'components/button',
        implementation,
        name: 'button',
      },
      {
        dirPath: 'components/button-list',
        implementation,
        name: 'button-list',
      },
    ];

    const wrapperPath:string = './wrapper/wrapper.jsx';

    const expectedFileString:string = `import Button from '../src/components/button/button';
import ButtonList from '../src/components/button-list/button-list';
import Wrapper from './wrapper/wrapper.jsx';
export {
  Button,
  ButtonList,
  Wrapper,
};`;

    // when
    const result:string = getFileString(componentInfos, wrapperPath);

    // then
    expect(result).toEqual(expectedFileString);
  });
});
