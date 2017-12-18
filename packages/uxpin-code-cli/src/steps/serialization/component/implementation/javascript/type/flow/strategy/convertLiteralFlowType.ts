import { FlowLiteralType } from '../../../../../../../../types/babylon-ast';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { createUnsupportedTypeDefinition } from '../../../../createUnsupportedTypeDefinition';
import { convertLiteralUnionSegment } from '../../../../types/union/convertLiteralUnionSegment';

export function convertLiteralFlowType(flowLiteral:FlowLiteralType):PropertyType<'literal' | 'unsupported'> {
  return convertLiteralUnionSegment(flowLiteral.value) || createUnsupportedTypeDefinition(flowLiteral.value);
}
