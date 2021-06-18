import { PropertyType } from '../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { createUnsupportedTypeDefinition } from '../../../../../../../steps/serialization/component/implementation/createUnsupportedTypeDefinition';
import { convertLiteralUnionSegment } from '../../../../../../../steps/serialization/component/implementation/types/union/convertLiteralUnionSegment';
import { FlowLiteralType } from '../../../../../../../types/babylon-ast';

export function convertLiteralFlowType(flowLiteral:FlowLiteralType):PropertyType<'literal' | 'unsupported'> {
  return convertLiteralUnionSegment(flowLiteral.value) || createUnsupportedTypeDefinition(flowLiteral.value);
}
