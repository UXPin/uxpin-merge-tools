import * as ts from 'typescript';
import * as path from 'path';

export function findComponentFile(program: ts.Program, relativePath: string): ts.SourceFile | undefined {
  for (const sourceFile of program.getSourceFiles()) {
    // for an unknown reason `sourceFile.fileName` can be either a relative path (`src/xxx.tsx`)
    // or an absolute file path (`Users/yyy/src/xxx.tsx`)
    if (sourceFile.fileName.endsWith(relativePath)) {
      return sourceFile;
    }

    try {
      if (sourceFile.fileName === path.resolve(relativePath)) {
        return sourceFile;
      }
    } catch (e) {
      // do nothing
    }
  }
}
