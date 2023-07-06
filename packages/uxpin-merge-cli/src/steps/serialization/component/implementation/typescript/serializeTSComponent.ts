import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo, TypeScriptConfig } from '../../../../discovery/component/ComponentInfo';
import { validateWrappers } from '../../../validation/validateWrappers';
import { ComponentNamespace } from '../../ComponentDefinition';
import { serializeAndValidateParsedProperties } from '../../props/serializeAndValidateParsedProperties';
import { ComponentWrapper } from '../../wrappers/ComponentWrapper';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { PropDefinitionParsingResult } from '../PropDefinitionParsingResult';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { getComponentDeclaration } from './component/getComponentDeclaration';
import { getComponentDocUrl } from './comments/jsdoc-docurl';
import { getComponentNamespace } from './comments/jsdoc-namespace';
import { getComponentUsePortal } from './comments/jsdoc-useportal';
import { getComponentName } from './component/getComponentName';
import { getComponentWrappers } from './component/getComponentWrappers';
import { ComponentDeclaration } from './component/getPropsTypeAndDefaultProps';
import { isDefaultExported } from './component/isDefaultExported';
import { getSerializationContext, TSSerializationContext } from './context/getSerializationContext';
import { parseTSComponentProperties } from './parseTSComponentProperties';

export async function serializeTSComponent(
  component: ComponentImplementationInfo,
  config?: TypeScriptConfig
): Promise<ImplSerializationResult> {
  const context: TSSerializationContext = getSerializationContext(component, config);

  const declaration: ComponentDeclaration | undefined = getComponentDeclaration(context);
  if (!declaration) {
    throw new Error('No component found!');
  }

  const name: string = getComponentName(context, declaration);
  const parsedProps: PropDefinitionParsingResult[] = parseTSComponentProperties(context, declaration);
  const validatedProps: PropDefinitionSerializationResult[] = serializeAndValidateParsedProperties(parsedProps);
  const namespace: ComponentNamespace | undefined = getComponentNamespace(declaration, name);
  const componentDocUrl: string | undefined = getComponentDocUrl(declaration);
  const wrappers: ComponentWrapper[] = getComponentWrappers(declaration);
  const validatedWrappers: Warned<ComponentWrapper[]> = validateWrappers(wrappers, component);
  const defaultExported: boolean = isDefaultExported(declaration, context);
  const usePortal = getComponentUsePortal(declaration) || undefined;

  console.log({usePortal});


  return {
    result: {
      componentDocUrl,
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
