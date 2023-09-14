import debug from 'debug';
import * as ts from 'typescript';

import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { validateWrappers } from '../../../validation/validateWrappers';
import { ComponentNamespace } from '../../ComponentDefinition';
import { serializeAndValidateParsedProperties } from '../../props/serializeAndValidateParsedProperties';
import { ComponentWrapper } from '../../wrappers/ComponentWrapper';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { PropDefinitionParsingResult } from '../PropDefinitionParsingResult';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { getComponentDeclaration } from './component/getComponentDeclaration';
import {
  getComponentDescription,
  getComponentDocUrl,
  getComponentNamespace,
  getComponentUsePortal,
} from './comments/jsdoc-uxpin-annotations';
import { getComponentName } from './component/getComponentName';
import { getComponentWrappers } from './component/getComponentWrappers';
import { ComponentDeclaration } from './component/getPropsTypeAndDefaultProps';
import { isDefaultExported } from './component/isDefaultExported';
import { createTSProgram, getSerializationContext, TSSerializationContext } from './context/getSerializationContext';
import { parseTSComponentProperties } from './parseTSComponentProperties';

const log = debug('uxpin:serialization:ts');

// Called from a lot of unit tests but not from the main loop in `getDesignSystemMetadata()`
// TODO Refactor to use only the `Serializer` class everywhere?
export async function serializeTSComponent(component: ComponentImplementationInfo): Promise<ImplSerializationResult> {
  const program = createTSProgram([component.path]);
  return serializeTSComponentWithProgram(component, program);
}

// Called from the `serializer` class, to avoid the expensive creation of the `ts.Program`
export async function serializeTSComponentWithProgram(component: ComponentImplementationInfo, program: ts.Program) {
  const context: TSSerializationContext = getSerializationContext(component, program);
  const declaration: ComponentDeclaration | undefined = getComponentDeclaration(context);
  if (!declaration) {
    throw new Error('No component found!');
  }

  const name: string = getComponentName(context, declaration);
  const parsedProps: PropDefinitionParsingResult[] = parseTSComponentProperties(context, declaration);
  const validatedProps: PropDefinitionSerializationResult[] = serializeAndValidateParsedProperties(parsedProps);
  const namespace: ComponentNamespace | undefined = getComponentNamespace(declaration, name);
  const componentDocUrl: string | undefined = getComponentDocUrl(declaration);
  const componentDescription: string | undefined = getComponentDescription(declaration);
  const wrappers: ComponentWrapper[] = getComponentWrappers(declaration);
  const validatedWrappers: Warned<ComponentWrapper[]> = validateWrappers(wrappers, component);
  const defaultExported: boolean = isDefaultExported(declaration, context);

  const usePortal = getComponentUsePortal(declaration) || undefined;
  if (usePortal) log(`Portal component detected`, name, usePortal);

  return {
    result: {
      componentDocUrl,
      componentDescription,
      defaultExported,
      name,
      namespace,
      properties: validatedProps.map(({ result }) => result),
      wrappers: validatedWrappers.result,
      usePortal,
    },
    warnings: joinWarningLists(
      [...validatedProps.map(({ warnings }) => warnings), validatedWrappers.warnings],
      component.path
    ),
  };
}
