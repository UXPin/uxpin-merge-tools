import { PropertyType } from '../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { FlowArray } from '../../../../../../../types/babylon-ast';
import { convertFlowPropertyType } from '../convertFlowPropertyType';

export function convertArrayFlowType(flowType:FlowArray):PropertyType<'typedArray'> {
  return {
    name: 'typedArray',
    structure: {
      memberType: convertFlowPropertyType(flowType.elements[0]),
    },
  };
}
