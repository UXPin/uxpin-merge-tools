import { FlowSignatureTypeName, FlowTypeSignature } from '../../../../../../../../types/babylon-ast';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { convertFunctionSignatureFlowType } from './signature/convertFunctionSignatureFlowType';
import { convertObjectSignatureFlowType } from './signature/convertObjectSignatureFlowType';

const SIGNATURE_STRATEGIES:{ [name:string]:(flowType:FlowTypeSignature<FlowSignatureTypeName>) => PropertyType } = {
  function: convertFunctionSignatureFlowType,
  object: convertObjectSignatureFlowType,
};

export function convertSignatureFlowType(flowType:FlowTypeSignature<FlowSignatureTypeName>):PropertyType {
  if (SIGNATURE_STRATEGIES.hasOwnProperty(flowType.type)) {
    return SIGNATURE_STRATEGIES[flowType.type](flowType);
  }
  throw new Error(`Unsupported signature type: ${flowType.raw}`);
}
