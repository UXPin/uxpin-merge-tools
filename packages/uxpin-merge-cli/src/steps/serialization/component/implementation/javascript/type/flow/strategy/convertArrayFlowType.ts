import { FlowArray } from '../../../../../../../../types/babylon-ast';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { convertFlowPropertyType } from '../convertFlowPropertyType';

export function convertArrayFlowType(flowType:FlowArray):PropertyType<'typedArray'> {
  return {
    name: 'typedArray',
    structure: {
      memberType: convertFlowPropertyType(flowType.elements[0]),
    },
  };
}
