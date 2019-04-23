import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { getComponentDeclaration } from './component/getComponentDeclaration';
import { getComponentName } from './component/getComponentName';
import { ComponentDeclaration } from './component/getPropsTypeAndDefaultProps';
import { getSerializationContext, TSSerializationContext } from './context/getSerializationContext';
import { serializeComponentProperties } from './serializeComponentProperties';

export async function serializeTSComponent(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  const context:TSSerializationContext = getSerializationContext(component);

  const componentDeclaration:ComponentDeclaration | undefined = getComponentDeclaration(context);
  if (!componentDeclaration) {
    throw new Error('No component found!');
  }

  const componentName:string = getComponentName(context, componentDeclaration);
  const serializedProps:Warned<ComponentPropertyDefinition[]> =
    serializeComponentProperties(context, componentDeclaration);

  return {
    result: {
      name: componentName,
      properties: serializedProps.result,
    },
    warnings: serializedProps.warnings,
  };
}
