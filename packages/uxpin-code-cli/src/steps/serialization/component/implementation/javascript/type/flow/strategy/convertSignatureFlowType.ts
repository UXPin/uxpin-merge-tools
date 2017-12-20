import { FlowSignatureTypeName, FlowTypeSignature } from '../../../../../../../../types/babylon-ast';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { createUnsupportedTypeDefinition } from '../../../../createUnsupportedTypeDefinition';
import { convertFunctionSignatureFlowType } from './signature/convertFunctionSignatureFlowType';
import { convertObjectSignatureFlowType } from './signature/convertObjectSignatureFlowType';

type FlowTypeSignatureConvertingStrategy = (flowType:FlowTypeSignature<FlowSignatureTypeName>) => PropertyType;

const SIGNATURE_STRATEGIES:{ [name in FlowSignatureTypeName]:FlowTypeSignatureConvertingStrategy} = {
  function: convertFunctionSignatureFlowType,
  object: convertObjectSignatureFlowType,
};

export function convertSignatureFlowType(flowType:FlowTypeSignature<FlowSignatureTypeName>):PropertyType {
  if (SIGNATURE_STRATEGIES.hasOwnProperty(flowType.type)) {
    return SIGNATURE_STRATEGIES[flowType.type](flowType);
  }
  return createUnsupportedTypeDefinition(flowType.raw);
}
