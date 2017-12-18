import { FlowUnionType } from '../../../../../../../../types/babylon-ast';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { convertFlowPropertyType } from '../convertFlowPropertyType';

export function convertUnionFlowType(flowUnion:FlowUnionType):PropertyType<'union'> {
  return {
    name: 'union',
    structure: {
      elements: flowUnion.elements.map(convertFlowPropertyType),
    },
  };
}
