import { PropertyType } from '../../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { FlowTypeSignature } from '../../../../../../../../types/babylon-ast';
import { convertFlowPropertyType } from '../../convertFlowPropertyType';

export function convertFunctionSignatureFlowType(func:FlowTypeSignature<'function'>):PropertyType<'func'> {
  return {
    name: 'func',
    structure: {
      arguments: func.signature.arguments.map(({ name, type }) => ({
        name,
        type: convertFlowPropertyType(type),
      })),
      returnType: convertFlowPropertyType(func.signature.return),
    },
  };
}
