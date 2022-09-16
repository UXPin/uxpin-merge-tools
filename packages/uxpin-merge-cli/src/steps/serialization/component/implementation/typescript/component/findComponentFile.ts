import * as ts from 'typescript';

export function findComponentFile(program: ts.Program, path: string): ts.SourceFile | undefined {
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.fileName === path) {
      return sourceFile;
    }
  }
}
