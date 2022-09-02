import { getComponentClassName } from '../getComponentClassName';

describe('getComponentClassName', () => {
  it('returns className for CamelCase component name', () => {
    const componentDirName = 'CamelCase';
    const expectedComponentClassName = 'CamelCase';

    // when
    const result: string = getComponentClassName(componentDirName);

    // then
    expect(result).toEqual(expectedComponentClassName);
  });

  it('returns className for single word lowercase component name', () => {
    const componentDirName = 'checkbox';
    const expectedComponentClassName = 'Checkbox';

    // when
    const result: string = getComponentClassName(componentDirName);

    // then
    expect(result).toEqual(expectedComponentClassName);
  });

  it('returns className for dash-separated lowercase component name', () => {
    const componentDirName = 'checkbox-group';
    const expectedComponentClassName = 'CheckboxGroup';

    // when
    const result: string = getComponentClassName(componentDirName);

    // then
    expect(result).toEqual(expectedComponentClassName);
  });
});
