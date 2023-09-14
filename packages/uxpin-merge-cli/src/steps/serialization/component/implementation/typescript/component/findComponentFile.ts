import * as ts from 'typescript';

export function findComponentFile(program: ts.Program, path: string): ts.SourceFile | undefined {
  for (const sourceFile of program.getSourceFiles()) {
    // for an unknown reason `sourceFile.fileName` can be either a relative path (`src/xxx.tsx`)
    // or an absolute file path (`Users/yyy/src/xxx.tsx`)
    if (sourceFile.fileName.endsWith(path)) {
      return sourceFile;
    }
  }
}
