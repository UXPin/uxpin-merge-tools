import { getComponentClassName } from '../getComponentClassName';

describe('getComponentClassName', () => {
  it('returns className for CamelCase component name', () => {
    const componentDirName:string = 'CamelCase';
    const expectedComponentClassName:string = 'CamelCase';

    // when
    const result:string = getComponentClassName(componentDirName);

    // then
    expect(result).toEqual(expectedComponentClassName);
  });

  it('returns className for single word lowercase component name', () => {
    const componentDirName:string = 'checkbox';
    const expectedComponentClassName:string = 'Checkbox';

    // when
    const result:string = getComponentClassName(componentDirName);

    // then
    expect(result).toEqual(expectedComponentClassName);
  });

  it('returns className for dash-separated lowercase component name', () => {
    const componentDirName:string = 'checkbox-group';
    const expectedComponentClassName:string = 'CheckboxGroup';

    // when
    const result:string = getComponentClassName(componentDirName);

    // then
    expect(result).toEqual(expectedComponentClassName);
  });
});
