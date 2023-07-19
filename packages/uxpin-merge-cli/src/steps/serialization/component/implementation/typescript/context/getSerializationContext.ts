import debug from 'debug';
import * as ts from 'typescript';
import { ComponentImplementationInfo, TypeScriptConfig } from '../../../../../discovery/component/ComponentInfo';
import { findComponentFile } from '../component/findComponentFile';

const log = debug('uxpin:serialization:ctx');

export interface TSSerializationContext {
  checker: ts.TypeChecker;
  componentPath: string;
  file: ts.SourceFile;
  program: ts.Program;
}

export function getSerializationContext(
  component: ComponentImplementationInfo,
  globalProgram?: ts.Program
): TSSerializationContext {
  const { path } = component;
  const program = globalProgram || createTSProgram([path]);

  const file: ts.SourceFile | undefined = findComponentFile(program, path);
  if (!file) {
    throw new Error(`TypeScript compiler couldn't find component file`);
  }

  return {
    checker: program.getTypeChecker(),
    componentPath: path,
    file,
    program,
  };
}

export function createTSProgram(paths: string[], config?: TypeScriptConfig) {
  log(`Create TS program for ${paths.length} path(s)`);
  const program: ts.Program = ts.createProgram(paths, {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    // we can't just use `...config?.compilerOptions`
    baseUrl: config?.compilerOptions?.baseUrl,
    paths: config?.compilerOptions?.paths,
  });
  log('Program created');
  return program;
}
