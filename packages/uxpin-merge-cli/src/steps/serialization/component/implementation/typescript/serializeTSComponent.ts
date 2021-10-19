import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { validateWrappers } from '../../../validation/validateWrappers';
import { ComponentNamespace } from '../../ComponentDefinition';
import { ComponentDocUrl } from '../../ComponentDefinition';
import { serializeAndValidateParsedProperties } from '../../props/serializeAndValidateParsedProperties';
import { ComponentWrapper } from '../../wrappers/ComponentWrapper';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { PropDefinitionParsingResult } from '../PropDefinitionParsingResult';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { getComponentDeclaration } from './component/getComponentDeclaration';
import { getComponentName } from './component/getComponentName';
import { getComponentNamespace } from './component/getComponentNamespace';
import { getComponentDocUrl } from './component/getComponentDocUrl';
import { getComponentWrappers } from './component/getComponentWrappers';
import { ComponentDeclaration } from './component/getPropsTypeAndDefaultProps';
import { isDefaultExported } from './component/isDefaultExported';
import { getSerializationContext, TSSerializationContext } from './context/getSerializationContext';
import { parseTSComponentProperties } from './parseTSComponentProperties';

export async function serializeTSComponent(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  const context:TSSerializationContext = getSerializationContext(component);

  const declaration:ComponentDeclaration | undefined = getComponentDeclaration(context);
  if (!declaration) {
    throw new Error('No component found!');
  }

  const name:string = getComponentName(context, declaration);
  const parsedProps:PropDefinitionParsingResult[] = parseTSComponentProperties(context, declaration);
  const validatedProps:PropDefinitionSerializationResult[] = serializeAndValidateParsedProperties(parsedProps);
  const namespace:ComponentNamespace | undefined = getComponentNamespace(declaration, name);
  const componentDocUrl:ComponentDocUrl | undefined = getComponentDocUrl(declaration);
  const wrappers:ComponentWrapper[] = getComponentWrappers(declaration);
  const validatedWrappers:Warned<ComponentWrapper[]> = validateWrappers(wrappers, component);
  const defaultExported:boolean = isDefaultExported(declaration, context);

  return {
    result: {
      defaultExported,
      name,
      namespace,
      componentDocUrl,
      properties: validatedProps.map(({ result }) => result),
      wrappers: validatedWrappers.result,
    },
    warnings: joinWarningLists(
      [
        ...validatedProps.map(({ warnings }) => warnings),
        validatedWrappers.warnings,
      ],
      component.path,
    ),
  };
}
