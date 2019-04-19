import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { getSerializationContext, TSSerializationContext } from './context/getSerializationContext';
import { serializeComponentProperties } from './serializeComponentProperties';

export async function serializeTSComponent(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  const context:TSSerializationContext = getSerializationContext(component);
  const serializedProps:Warned<ComponentPropertyDefinition[]> = serializeComponentProperties(context);

  return {
    result: {
      name: context.componentName,
      properties: serializedProps.result,
    },
    warnings: serializedProps.warnings,
  };
}
