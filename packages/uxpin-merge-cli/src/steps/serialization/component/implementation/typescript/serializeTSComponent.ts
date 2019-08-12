import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { validateWrappers } from '../../../../serialization/validation/validateWrappers';
import { validateProps } from '../../../validation/validateProps';
import { ComponentNamespace } from '../../ComponentDefinition';
import { ComponentWrapper } from '../../wrappers/ComponentWrapper';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { getComponentDeclaration } from './component/getComponentDeclaration';
import { getComponentName } from './component/getComponentName';
import { getComponentNamespace } from './component/getComponentNamespace';
import { getComponentWrappers } from './component/getComponentWrappers';
import { ComponentDeclaration } from './component/getPropsTypeAndDefaultProps';
import { getSerializationContext, TSSerializationContext } from './context/getSerializationContext';
import { serializeComponentProperties } from './serializeComponentProperties';

export async function serializeTSComponent(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  const context:TSSerializationContext = getSerializationContext(component);

  const declaration:ComponentDeclaration | undefined = getComponentDeclaration(context);
  if (!declaration) {
    throw new Error('No component found!');
  }

  const name:string = getComponentName(context, declaration);
  const serializedProps:Array<Warned<ComponentPropertyDefinition>> =
    serializeComponentProperties(context, declaration);
  const validatedProps:Array<Warned<ComponentPropertyDefinition>> = validateProps(serializedProps);
  const namespace:ComponentNamespace | undefined = getComponentNamespace(declaration, name);
  const wrappers:ComponentWrapper[] = getComponentWrappers(declaration);
  const validatedWrappers:Warned<ComponentWrapper[]> = validateWrappers(wrappers, component);

  return {
    result: {
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
