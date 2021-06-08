import { joinWarningLists } from '../../../../common/warning/joinWarningLists';
import { Warned } from '../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../steps/discovery/component/ComponentInfo';
import { ComponentNamespace } from '../../../../steps/serialization/component/ComponentDefinition';
import { ImplSerializationResult } from '../../../../steps/serialization/component/implementation/ImplSerializationResult';
import { PropDefinitionParsingResult } from '../../../../steps/serialization/component/implementation/PropDefinitionParsingResult';
import { PropDefinitionSerializationResult } from '../../../../steps/serialization/component/implementation/PropDefinitionSerializationResult';
import { getComponentName } from '../../../../steps/serialization/component/implementation/typescript/component/getComponentName';
import { getComponentNamespace } from '../../../../steps/serialization/component/implementation/typescript/component/getComponentNamespace';
import { getComponentWrappers } from '../../../../steps/serialization/component/implementation/typescript/component/getComponentWrappers';
import { ComponentDeclaration } from '../../../../steps/serialization/component/implementation/typescript/component/getPropsTypeAndDefaultProps';
import { isDefaultExported } from '../../../../steps/serialization/component/implementation/typescript/component/isDefaultExported';
import { TSSerializationContext } from '../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { serializeAndValidateParsedProperties } from '../../../../steps/serialization/component/props/serializeAndValidateParsedProperties';
import { ComponentWrapper } from '../../../../steps/serialization/component/wrappers/ComponentWrapper';
import { validateWrappers } from '../../../../steps/serialization/validation/validateWrappers';
import { getComponentDeclaration } from './component/getComponentDeclaration';
import { getSerializationContext } from './context/getSerializationContext';
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
  const wrappers:ComponentWrapper[] = getComponentWrappers(declaration);
  const validatedWrappers:Warned<ComponentWrapper[]> = validateWrappers(wrappers, component);
  const defaultExported:boolean = isDefaultExported(declaration, context);

  return {
    result: {
      defaultExported,
      name,
      namespace,
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
