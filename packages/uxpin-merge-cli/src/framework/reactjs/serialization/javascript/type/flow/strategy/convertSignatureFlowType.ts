import { PropertyType } from '../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { createUnsupportedTypeDefinition } from '../../../../../../../steps/serialization/component/implementation/createUnsupportedTypeDefinition';
import { FlowTypeSignature } from '../../../../../../../types/babylon-ast';
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
