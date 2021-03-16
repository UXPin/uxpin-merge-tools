import { resolve } from 'path';
import { using } from '../../../../../../../test/utils/using';
import { isDefaultExported } from '../isDefaultExported';

const JS_COMPONENTS_DIR:string = '../../../../../../../test/resources/components/javascript';

describe('getComponentNameFromStoriesTitle', () => {
  const cases:any[] = [
    /////////// Class components
    ////// Default exported
    // export default class Component
    { path: 'ClassWithDefaults.jsx', componentName: 'ClassWithDefaults', expected: true },

    // class Component
    // export default Component
    {
      componentName: 'ClassWithSeparateDefaultExportDeclaratin',
      expected: true,
      path: 'ClassWithSeparateDefaultExportDeclaratin.jsx',
    },

    // /**
    //  * @uxpincomponent
    //  */
    // export class ClassPrependedWithCommentToBeComposedWithHOC
    // export default HOC(ClassPrependedWithCommentToBeComposedWithHOC)
    {
      componentName: 'ClassPrependedWithCommentToBeComposedWithHOC',
      expected: true,
      path: 'DefaultExportedFunctionalComponentComposedWithHOCAndComment.jsx',
    },

    ////// Named exported
    // export class ClassWithNamedExport
    {
      componentName: 'ClassWithNamedExport',
      expected: false,
      path: 'ClassWithNamedExport.jsx',
    },

    // class ClassWithNamedExport
    // export ClassWithNamedExport;
    {
      componentName: 'ClassWithSeparateNamedExportDeclaration',
      expected: false,
      path: 'ClassWithSeparateNamedExportDeclaration.jsx',
    },

    /////////// Function components
    ////// Default exported
    // export default function()
    { path: 'FunctionPrimitivesOnly.jsx', componentName: 'FunctionPrimitivesOnly', expected: true },

    // const FunctionWithDefaults = () => {}
    // export default FunctionWithDefaults;
    { path: 'FunctionWithDefaults.jsx', componentName: 'FunctionWithDefaults', expected: true },

    // function FunctionWithImportedEnum()
    // export default FunctionWithImportedEnum;
    { path: 'FunctionWithImportedEnum.jsx', componentName: 'FunctionWithImportedEnum', expected: true },

    // /**
    //  * @uxpincomponent
    //  */
    // const FunctionWithComponentDeclarationAndCustomName = () => {}
    // export default HOC(FunctionWithComponentDeclarationAndCustomName)
    {
      componentName: 'FunctionWithComponentDeclarationAndCustomName',
      expected: true,
      path: 'FunctionWithComponentDeclaration.jsx',
    },

    ////// Named exported
    // export const ArrowFunctionWithNamedExport = () => {}
    {
      componentName: 'ArrowFunctionWithNamedExport',
      expected: false,
      path: 'ArrowFunctionWithNamedExport.jsx',
    },

    // export function FunctionWithNamedExport() {}
    {
      componentName: 'FunctionWithNamedExport',
      expected: false,
      path: 'FunctionWithNamedExport.jsx',
    },

    // function FunctionWithSeparateNamedExportDeclaration() {}
    // export { FunctionWithSeparateNamedExportDeclaration }
    {
      componentName: 'FunctionWithSeparateNamedExportDeclaration',
      expected: false,
      path: 'FunctionWithSeparateNamedExportDeclaration.jsx',
    },

    // const ArrowFunctionWithSeparateNamedExportDeclaration = () => {}
    // export { ArrowFunctionWithSeparateNamedExportDeclaration }
    {
      componentName: 'ArrowFunctionWithSeparateNamedExportDeclaration',
      expected: false,
      path: 'ArrowFunctionWithSeparateNamedExportDeclaration.jsx',
    },
  ];

  using(cases).describe(
    'checking if isDefaultExported correctly detect default export', ({ path, componentName, expected }) => {
      it(`for given ${componentName} in ${path}`, () => {
        const absPathToComponentFile:string = resolve(__dirname, JS_COMPONENTS_DIR, path);
        expect(isDefaultExported(absPathToComponentFile, componentName)).toEqual(expected);
      });
    });
});
