import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';

export function findComponentFile({ program }:TSSerializationContext, path:string):ts.SourceFile | undefined {
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.fileName === path) {
      return sourceFile;
    }
  }
}
