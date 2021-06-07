import { PropertyType } from '../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { FlowUnionType } from '../../../../../../../types/babylon-ast';
import { convertFlowPropertyType } from '../convertFlowPropertyType';

export function convertUnionFlowType(flowUnion:FlowUnionType):PropertyType<'union'> {
  return {
    name: 'union',
    structure: {
      elements: flowUnion.elements.map(convertFlowPropertyType),
    },
  };
}
