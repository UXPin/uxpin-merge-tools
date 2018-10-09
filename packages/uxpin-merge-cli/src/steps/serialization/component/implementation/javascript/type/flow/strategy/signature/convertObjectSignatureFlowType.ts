import { FlowTypeSignature } from '../../../../../../../../../types/babylon-ast';
import { PropertyType, ShapeTypeStructure } from '../../../../../ComponentPropertyDefinition';
import { convertFlowPropertyType } from '../../convertFlowPropertyType';

export function convertObjectSignatureFlowType(object:FlowTypeSignature<'object'>):PropertyType<'shape'> {
  const structure:ShapeTypeStructure = object.signature.properties.reduce((objectProperties, next) => {
    objectProperties[next.key] = convertFlowPropertyType(next.value);
    return objectProperties;
  }, {} as ShapeTypeStructure);
  return { name: 'shape', structure };
}
