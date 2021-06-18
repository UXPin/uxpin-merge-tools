import { PropertyType, ShapeTypeStructure } from '../../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { FlowTypeSignature } from '../../../../../../../../types/babylon-ast';
import { convertFlowPropertyType } from '../../convertFlowPropertyType';

export function convertObjectSignatureFlowType(object:FlowTypeSignature<'object'>):PropertyType<'shape'> {
  const structure:ShapeTypeStructure = object.signature.properties.reduce((objectProperties, next) => {
    objectProperties[next.key] = convertFlowPropertyType(next.value);
    return objectProperties;
  }, {} as ShapeTypeStructure);
  return { name: 'shape', structure };
}
