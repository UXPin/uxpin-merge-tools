import * as ts from 'typescript';
import { TSSerializationContext } from '../serializeTSComponent';

export function findComponentFile({ program }:TSSerializationContext, path:string):ts.SourceFile | undefined {
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.fileName === path) {
      return sourceFile;
    }
  }
}
