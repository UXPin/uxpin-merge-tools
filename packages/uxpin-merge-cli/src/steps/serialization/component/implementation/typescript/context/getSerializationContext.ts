import * as ts from 'typescript';
import { ComponentImplementationInfo, TypeScriptConfig } from '../../../../../discovery/component/ComponentInfo';
import { findComponentFile } from '../component/findComponentFile';

export interface TSSerializationContext {
  checker: ts.TypeChecker;
  componentPath: string;
  file: ts.SourceFile;
  program: ts.Program;
}

export function getSerializationContext(
  component: ComponentImplementationInfo,
  config?: TypeScriptConfig
): TSSerializationContext {
  const { path } = component;

  const program: ts.Program = ts.createProgram([path], {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    // we can't just use `...config?.compilerOptions`
    baseUrl: config?.compilerOptions?.baseUrl,
    paths: config?.compilerOptions?.paths,
  });

  const file: ts.SourceFile | undefined = findComponentFile(program, path);
  if (!file) {
    throw new Error("TypeScript compiler couldn't find component file");
  }

  return {
    checker: program.getTypeChecker(),
    componentPath: path,
    file,
    program,
  };
}
