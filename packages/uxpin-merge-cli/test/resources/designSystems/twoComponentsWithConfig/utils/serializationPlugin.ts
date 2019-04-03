import {
  ComponentImplementationInfo,
  ComponentPropertyDefinition,
  ImplSerializationResult,
  serializeTSComponent,
} from '@uxpin/merge-cli';

export async function serializationPlugin(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  const result = await serializeTSComponent(component);

  result.result.properties = result.result.properties.map((property:ComponentPropertyDefinition) => {
    return {
      ...property,
      name: property.name.split('').reverse().join(''),
    };
  });

  return result;
}
