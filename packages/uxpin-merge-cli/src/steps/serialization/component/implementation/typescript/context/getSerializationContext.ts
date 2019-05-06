import * as ts from 'typescript';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { findComponentFile } from '../component/findComponentFile';

export interface TSSerializationContext {
  checker:ts.TypeChecker;
  componentPath:string;
  file:ts.SourceFile;
  program:ts.Program;
}

export function getSerializationContext(component:ComponentImplementationInfo):TSSerializationContext {
  const { path } = component;
  const program:ts.Program = ts.createProgram([path], {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
  });

  const file:ts.SourceFile | undefined = findComponentFile(program, path);
  if (!file) {
    throw new Error('TypeScript compiler couldn\'t find component file');
  }

  return {
    checker: program.getTypeChecker(),
    componentPath: path,
    file,
    program,
  };
}
