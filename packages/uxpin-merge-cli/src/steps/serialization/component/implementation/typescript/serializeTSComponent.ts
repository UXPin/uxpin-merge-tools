import { parse } from 'path';
import * as ts from 'typescript';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { serializeComponentProperties } from './serializeComponentProperties';

export interface TSComponentSerializationEnv {
  componentName:string;
  componentPath:string;
  program:ts.Program;
  checker:ts.TypeChecker;
}

export function serializeTSComponent(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  return new Promise((resolve) => {
    const componentName:string = parse(component.path).name;
    const program:ts.Program = ts.createProgram([component.path], {
      module: ts.ModuleKind.ES2015,
      target: ts.ScriptTarget.ES2015,
    });
    const env:TSComponentSerializationEnv = {
      checker: program.getTypeChecker(),
      componentName,
      componentPath: component.path,
      program,
    };

    const serializedProps:Warned<ComponentPropertyDefinition[]> = serializeComponentProperties(env);
    resolve({
      result: {
        name: componentName,
        properties: serializedProps.result,
      },
      warnings: serializedProps.warnings,
    });
  });
}
