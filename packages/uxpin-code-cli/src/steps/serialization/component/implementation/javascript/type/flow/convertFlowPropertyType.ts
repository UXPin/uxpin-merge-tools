import { FlowType, KnownFlowTypeName } from '../../../../../../../types/babylon-ast';
import { PropertyType } from '../../../ComponentPropertyDefinition';
import { createUnsupportedTypeDefinition } from '../../../createUnsupportedTypeDefinition';
import { KnownReactFlowTypeName } from './KnownReactFlowTypeName';
import { convertArrayFlowType } from './strategy/convertArrayFlowType';
import { convertLiteralFlowType } from './strategy/convertLiteralFlowType';
import { convertSignatureFlowType } from './strategy/convertSignatureFlowType';
import { convertUnionFlowType } from './strategy/convertUnionFlowType';
import { tupleCreatePrimitivePropertyType } from './strategy/tupleCreatePrimitivePropertyType';

const STRATEGIES:{ [typeName in NamesToBeConverted]:(type:FlowType) => PropertyType } = {
  Array: convertArrayFlowType,
  Function: tupleCreatePrimitivePropertyType('func'),
  Object: tupleCreatePrimitivePropertyType('object'),
  React$Node: tupleCreatePrimitivePropertyType('element'),
  any: tupleCreatePrimitivePropertyType('any'),
  bool: tupleCreatePrimitivePropertyType('boolean'),
  boolean: tupleCreatePrimitivePropertyType('boolean'),
  literal: convertLiteralFlowType,
  null: tupleCreatePrimitivePropertyType('empty'),
  number: tupleCreatePrimitivePropertyType('number'),
  signature: convertSignatureFlowType,
  string: tupleCreatePrimitivePropertyType('string'),
  union: convertUnionFlowType,
  void: tupleCreatePrimitivePropertyType('empty'),
};

export function convertFlowPropertyType(propType:FlowType):PropertyType {
  if (STRATEGIES.hasOwnProperty(propType.name)) {
    const strategies:{ [typeName:string]:(flowType:FlowType) => PropertyType } = STRATEGIES as any;
    return strategies[propType.name](propType);
  }
  return createUnsupportedTypeDefinition(propType.name);
}

type NamesToBeConverted = KnownFlowTypeName | KnownReactFlowTypeName;
