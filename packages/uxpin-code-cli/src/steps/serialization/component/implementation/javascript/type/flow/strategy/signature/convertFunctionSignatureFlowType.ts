import { FlowTypeSignature } from '../../../../../../../../../types/babylon-ast';
import { PropertyType } from '../../../../../ComponentPropertyDefinition';
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
