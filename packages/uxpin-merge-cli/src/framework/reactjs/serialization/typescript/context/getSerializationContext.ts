import * as ts from 'typescript';
import { ComponentImplementationInfo } from '../../../../../steps/discovery/component/ComponentInfo';
import { findComponentFile } from '../../../../../steps/serialization/component/implementation/typescript/component/findComponentFile';
import { TSSerializationContext } from '../../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';

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
