import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { validateProps } from '../../../validation/validateProps';
import { ComponentNamespace } from '../../ComponentDefinition';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { getComponentDeclaration } from './component/getComponentDeclaration';
import { getComponentName } from './component/getComponentName';
import { getComponentNamespace } from './component/getComponentNamespace';
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

  return {
    result: { name, properties:validatedProps.map(({ result }) => result), namespace },
    warnings: joinWarningLists(validatedProps.map(({ warnings }) => warnings), component.path),
  };
}
