import { getJavaScriptComponentPath } from '../../../../../../../test/utils/resources/getExampleComponentPath';
import { using } from '../../../../../../../test/utils/using';
import { isDefaultExported } from '../isDefaultExported';

describe('getComponentNameFromStoriesTitle', () => {
  const cases:any[] = [
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
      filename: 'DefaultExportedFunctionalComponentComposedWithHOCAndComment',
    },

    ////// Named exported
    // export class ClassWithNamedExport
    {
      componentName: 'ClassWithNamedExport',
      expected: false,
      filename: 'ClassWithNamedExport',
    },

    // class ClassWithNamedExport
    // export ClassWithNamedExport;
    {
      componentName: 'ClassWithSeparateNamedExportDeclaration',
      expected: false,
      filename: 'ClassWithSeparateNamedExportDeclaration',
    },

    /////////// Function components
    ////// Default exported
    // export default function()
    { filename: 'FunctionPrimitivesOnly', componentName: 'FunctionPrimitivesOnly', expected: true },

    // const FunctionWithDefaults = () => {}
    // export default FunctionWithDefaults;
    { filename: 'FunctionWithDefaults', componentName: 'FunctionWithDefaults', expected: true },

    // function FunctionWithImportedEnum()
    // export default FunctionWithImportedEnum;
    { filename: 'FunctionWithImportedEnum', componentName: 'FunctionWithImportedEnum', expected: true },

    // /**
    //  * @uxpincomponent
    //  */
    // const FunctionWithComponentDeclarationAndCustomName = () => {}
    // export default HOC(FunctionWithComponentDeclarationAndCustomName)
    {
      componentName: 'FunctionWithComponentDeclarationAndCustomName',
      expected: true,
      filename: 'FunctionWithComponentDeclaration',
    },

    ////// Named exported
    // export const ArrowFunctionWithNamedExport = () => {}
    {
      componentName: 'ArrowFunctionWithNamedExport',
      expected: false,
      filename: 'ArrowFunctionWithNamedExport',
    },

    // export function FunctionWithNamedExport() {}
    {
      componentName: 'FunctionWithNamedExport',
      expected: false,
      filename: 'FunctionWithNamedExport',
    },

    // function FunctionWithSeparateNamedExportDeclaration() {}
    // export { FunctionWithSeparateNamedExportDeclaration }
    {
      componentName: 'FunctionWithSeparateNamedExportDeclaration',
      expected: false,
      filename: 'FunctionWithSeparateNamedExportDeclaration',
    },

    // const ArrowFunctionWithSeparateNamedExportDeclaration = () => {}
    // export { ArrowFunctionWithSeparateNamedExportDeclaration }
    {
      componentName: 'ArrowFunctionWithSeparateNamedExportDeclaration',
      expected: false,
      filename: 'ArrowFunctionWithSeparateNamedExportDeclaration',
    },
  ];

  using(cases).describe(
    'checking if isDefaultExported correctly detect default export', ({ filename, componentName, expected }) => {
      it(`for given ${componentName} in ${filename}`, () => {
        expect(isDefaultExported(getJavaScriptComponentPath(filename), componentName)).toEqual(expected);
      });
    });
});
