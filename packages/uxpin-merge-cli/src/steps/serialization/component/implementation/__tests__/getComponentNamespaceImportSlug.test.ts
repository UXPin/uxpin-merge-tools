import { getComponentNamespaceImportSlug } from '../getComponentNamespaceImportSlug';

describe('getComponentNamespaceImportSlug', () => {
  const componentName:string = 'ComponentName';

  describe('given single level namespace name', () => {
    const namespaceName:string = 'SingleNamespace';
    let importSlug:string;

    beforeAll(() => {
      importSlug = getComponentNamespaceImportSlug(namespaceName, componentName);
    });

    it('joins namespace and component name with delimiter', () => {
      expect(importSlug).toEqual('SingleNamespace_ComponentName');
    });
  });

  describe('given multi-level namespace name', () => {
    const namespaceName:string = 'Level1.level2.Namespace';
    let importSlug:string;

    beforeAll(() => {
      importSlug = getComponentNamespaceImportSlug(namespaceName, componentName);
    });

    it('creates import string replacing original namespace delimiter', () => {
      expect(importSlug).toEqual('Level1_level2_Namespace_ComponentName');
    });
  });
});
