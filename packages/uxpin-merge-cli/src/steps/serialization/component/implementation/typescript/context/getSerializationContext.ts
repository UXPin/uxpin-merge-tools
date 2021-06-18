import * as ts from 'typescript';

export interface TSSerializationContext {
  checker:ts.TypeChecker;
  componentPath:string;
  file:ts.SourceFile;
  program:ts.Program;
}
