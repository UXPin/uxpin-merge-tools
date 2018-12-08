import * as ts from 'typescript';
import { TSComponentSerializationEnv } from '../serializeTSComponent';

export function findComponentFile({ program }:TSComponentSerializationEnv, path:string):ts.SourceFile | undefined {
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.fileName === path) {
      return sourceFile;
    }
  }
}
