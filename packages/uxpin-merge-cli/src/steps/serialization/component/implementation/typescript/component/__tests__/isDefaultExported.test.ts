import { getTypeScriptComponentPath } from '../../../../../../../../test/utils/resources/getExampleComponentPath';
import { using } from '../../../../../../../../test/utils/using';
import { ComponentImplementationInfo } from '../../../../../../discovery/component/ComponentInfo';
import { getSerializationContext, TSSerializationContext } from '../../context/getSerializationContext';
import { getComponentDeclaration } from '../getComponentDeclaration';
import { ComponentDeclaration } from '../getPropsTypeAndDefaultProps';
import { isDefaultExported } from '../isDefaultExported';

export function getImplementation(componentName:string):ComponentImplementationInfo {
  return {
    framework: 'reactjs',
    lang: 'typescript',
    path: getTypeScriptComponentPath(componentName),
  };
}

describe('getComponentNameFromStoriesTitle', () => {
  const cases:any[] = [
    // detect any default in sperate export from component definition
    {
      componentName: 'NewComponentDefinitionExportNameDifferent',
      expected: true,
      filename: 'ComponentDefinitionExportNameDifferent',
    },

    /////////// Class components
    ////// Default exported
    // export default class Component
    { filename: 'ClassWithDefaults', componentName: 'ClassWithDefaults', expected: true },

    // class Component
    // export default Component
    {
      componentName: 'ClassWithSeparateDefaultExportDeclaratin',
      expected: true,
      filename: 'ClassWithSeparateDefaultExportDeclaratin',
    },

    // /**
    //  * @uxpincomponent
    //  */
    // export class ClassPrependedWithCommentToBeComposedWithHOC
    // export default HOC(ClassPrependedWithCommentToBeComposedWithHOC)
    {
      componentName: 'ClassPrependedWithCommentToBeComposedWithHOC',
      expected: true,
      filename: 'DefaultExportedClassComposedWithHOCAndComment',
    },

    ////// Named exported
    // export class ClassWithNamedExport
    {
      componentName: 'NamedExportedClassMatchingFilename',
      expected: false,
      filename: 'NamedExportedClassMatchingFilename',
    },

    // class ClassWithNamedExport
    // export ClassWithNamedExport;
    {
      componentName: 'NamedExportedClassMatchingFilenameWithSeparateExportDeclaration',
      expected: false,
      filename: 'NamedExportedClassMatchingFilenameWithSeparateExportDeclaration',
    },

    /////////// Function components
    ////// Default exported
    // export default function()
    { filename: 'FunctionPrimitivesOnly', componentName: 'FunctionPrimitivesOnly', expected: true },

    // export default () => {}
    {
      componentName: 'DefaultExportedArrowFunctionWithDefaultsInDestructuring',
      expected: true,
      filename: 'DefaultExportedArrowFunctionWithDefaultsInDestructuring',
    },

    // const FunctionWithDefaults = () => {}
    // export default FunctionWithDefaults;
    {
      componentName: 'ArrowFunctionWithDefaultsAsStaticProperty',
      expected: true,
      filename: 'ArrowFunctionWithDefaultsAsStaticProperty',
    },

    // export function DefaultExportedFunctionalComponentMatchingFilenameComposedWithHOC()
    // export default HOC(DefaultExportedFunctionalComponentMatchingFilenameComposedWithHOC);
    {
      componentName: 'DefaultExportedFunctionalComponentMatchingFilenameComposedWithHOC',
      expected: true,
      filename: 'DefaultExportedFunctionalComponentMatchingFilenameComposedWithHOC',
    },

    // /**
    //  * @uxpincomponent
    //  */
    // const FunctionWithComponentDeclarationAndCustomName = () => {}
    // export default HOC(FunctionWithComponentDeclarationAndCustomName)
    {
      componentName: 'FunctionalComponentPrependedWithCommentToBeComposedWithHOC',
      expected: true,
      filename: 'DefaultExportedFunctionalComponentComposedWithHOCAndComment',
    },

    ////// Named exported
    // export const ArrowFunctionWithNamedExport = () => {}
    {
      componentName: 'ArrowFunctionWithNamedExport',
      expected: false,
      filename: 'ArrowFunctionWithNamedExport',
    },

    // // export function FunctionWithNamedExport() {}
    {
      componentName: 'FunctionWithNamedExport',
      expected: false,
      filename: 'FunctionWithNamedExport',
    },

    // // function FunctionWithSeparateNamedExportDeclaration() {}
    // // export { FunctionWithSeparateNamedExportDeclaration }
    {
      componentName: 'FunctionWithSeparateNamedExportDeclaration',
      expected: false,
      filename: 'FunctionWithSeparateNamedExportDeclaration',
    },

    // // const ArrowFunctionWithSeparateNamedExportDeclaration = () => {}
    // // export { ArrowFunctionWithSeparateNamedExportDeclaration }
    {
      componentName: 'ArrowFunctionWithSeparateNamedExportDeclaration',
      expected: false,
      filename: 'ArrowFunctionWithSeparateNamedExportDeclaration',
    },

    /////////// component with ForwardRef
    // export default React.forwardRef
    {
      componentName: 'DefaultExportedComponentWithForwardRef',
      expected: true,
      filename: 'DefaultExportedComponentWithForwardRef',
    },

    // const Component = React.forwardRef
    // export { Component }
    {
      componentName: 'NamedExportedComponentWithForwardRef',
      expected: false,
      filename: 'NamedExportedComponentWithForwardRef',
    },

    /////////// Other
    // export { Component as default }
    {
      componentName: 'DefaultExportedWithAsDefaultStatement',
      expected: true,
      filename: 'DefaultExportedWithAsDefaultStatement',
    },
  ];

  using(cases).describe(
    'checking if isDefaultExported correctly detect default export', ({ filename, componentName, expected }) => {
      it(`for given ${componentName} in ${filename}`, () => {
        const component:ComponentImplementationInfo = getImplementation(filename);
        const context:TSSerializationContext = getSerializationContext(component);
        const declaration:ComponentDeclaration | undefined = getComponentDeclaration(context);

        if (declaration) {
          expect(isDefaultExported(declaration, context)).toEqual(expected);
        } else {
          console.log(`Failed to find declaration for ${filename}`);
        }
      });
    });
});
