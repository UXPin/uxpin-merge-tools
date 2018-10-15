import { FlowTypeSignature } from '../../../../../../../../types/babylon-ast';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { createUnsupportedTypeDefinition } from '../../../../createUnsupportedTypeDefinition';
import { convertFunctionSignatureFlowType } from './signature/convertFunctionSignatureFlowType';
import { convertObjectSignatureFlowType } from './signature/convertObjectSignatureFlowType';

type KnownFlowTypeSignature = FlowTypeSignature<'function'> | FlowTypeSignature<'object'>;

export function convertSignatureFlowType(flowType:KnownFlowTypeSignature | any):PropertyType {
  switch (flowType.type) {
    case 'function':
      return convertFunctionSignatureFlowType(flowType);
    case 'object':
      return convertObjectSignatureFlowType(flowType);
    default:
      return createUnsupportedTypeDefinition(flowType.raw);
  }
}
