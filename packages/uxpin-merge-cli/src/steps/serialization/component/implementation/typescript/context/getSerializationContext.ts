import * as ts from 'typescript';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';

export interface TSSerializationContext {
  checker:ts.TypeChecker;
  componentPath:string;
  program:ts.Program;
}

export function getSerializationContext(component:ComponentImplementationInfo):TSSerializationContext {
  const { path } = component;
  const program:ts.Program = ts.createProgram([path], {
    module: ts.ModuleKind.ES2015,
    target: ts.ScriptTarget.ES2015,
  });

  return {
    checker: program.getTypeChecker(),
    componentPath: path,
    program,
  };
}
