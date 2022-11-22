import * as ts from 'typescript';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { findComponentFile } from '../component/findComponentFile';
import { readFileSync } from 'fs-extra';

export interface TSSerializationContext {
  checker: ts.TypeChecker;
  componentPath: string;
  file: ts.SourceFile;
  program: ts.Program;
}

export function getSerializationContext(component: ComponentImplementationInfo): TSSerializationContext {
  const { path } = component;
  const program: ts.Program = ts.createProgram([path], {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    paths: getTypesciptPathAliases(),
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

function getTypesciptPathAliases(): ts.MapLike<string[]> | undefined {
  let paths;

  try {
    const configFile = readFileSync('tsconfig.json', { encoding: 'utf8' });
    const config = JSON.parse(configFile) as { compilerOptions: ts.CompilerOptions };
    if (config.compilerOptions.paths) {
      paths = config.compilerOptions.paths;
    }
  } catch (e) {
    // ignore error
  }

  return paths;
}
