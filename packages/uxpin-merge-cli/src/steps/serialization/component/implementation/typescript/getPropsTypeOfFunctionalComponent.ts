import * as ts from 'typescript';

export function getPropsTypeOfFunctionalComponent(func:ts.FunctionDeclaration):ts.TypeNode | undefined {
  if (!func.parameters || !func.parameters[0] || !func.parameters[0].type) {
    return;
  }
  return func.parameters[0].type;
}
