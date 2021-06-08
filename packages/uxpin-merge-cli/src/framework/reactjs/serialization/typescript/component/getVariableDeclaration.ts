import * as ts from 'typescript';
import { TSSerializationContext } from '../../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { getNodeName } from '../../../../../steps/serialization/component/implementation/typescript/node/getNodeName';
import { getComponentNameFromPath } from '../../../../../steps/serialization/component/name/getComponentNameFromPath';

export function getVariableDeclaration(context:TSSerializationContext):ts.VariableDeclaration | undefined {
  const componentName:string = getComponentNameFromPath(context.componentPath);
  return findVariableDeclaration(context.file, componentName);
}

function findVariableDeclaration(
  sourceFile:ts.SourceFile,
  componentFileName:string,
):ts.VariableDeclaration | undefined {
  let result:ts.VariableDeclaration | undefined;
  ts.forEachChild(sourceFile, (node) => {

    if (ts.isVariableStatement(node)) {
      const declaration:ts.VariableDeclaration = node.declarationList?.declarations[0];

      if (getNodeName(declaration) === componentFileName) {
        result = declaration;
      }
    }
  });

  return result;
}
