import { getComponentNameFromPath } from '../getComponentNameFromPath';

describe('getComponentNameFromPath', () => {
  it('returns component name from file path', () => {
    const componentFilePath:string = 'Component/Component.jsx';
    const expectedComponentName:string = 'Component';

    // when
    const result:string = getComponentNameFromPath(componentFilePath);

    // then
    expect(result).toEqual(expectedComponentName);
  });

  it('returns component name from file path includes .name adding to file extension', () => {
    const componentFilePath:string = 'Component/Component.react.jsx';
    const expectedComponentName:string = 'Component';

    // when
    const result:string = getComponentNameFromPath(componentFilePath);

    // then
    expect(result).toEqual(expectedComponentName);
  });
});
