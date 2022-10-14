import { getComponentNamespaceParents } from '../getComponentNamespaceParents';

describe('getComponentNamespaceParents', () => {
  it('should return all parent components names', () => {
    // having
    const name = 'Some.Nested.Component.Name';

    // when
    // then
    expect(getComponentNamespaceParents(name)).toEqual(['Some', 'Some.Nested', 'Some.Nested.Component']);
  });

  it('should return empty array for non namespaced component', () => {
    // having
    const name = 'Name';

    // when
    // then
    expect(getComponentNamespaceParents(name)).toEqual([]);
  });
});
