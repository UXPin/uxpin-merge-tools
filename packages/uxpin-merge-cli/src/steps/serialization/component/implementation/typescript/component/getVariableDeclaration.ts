import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
import { getComponentFileName } from './getComponentFileName';

export function getVariableDeclaration(context:TSSerializationContext):ts.VariableDeclaration | undefined {
  const fileName:string = getComponentFileName(context);

  return findVariableDeclaration(context.file, fileName);
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
