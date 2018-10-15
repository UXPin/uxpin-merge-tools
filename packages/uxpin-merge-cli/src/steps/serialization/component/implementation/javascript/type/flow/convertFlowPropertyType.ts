import { FlowType, KnownFlowTypeName } from '../../../../../../../types/babylon-ast';
import { PropertyType } from '../../../ComponentPropertyDefinition';
import { createUnsupportedTypeDefinition } from '../../../createUnsupportedTypeDefinition';
import { KnownReactFlowTypeName } from './KnownReactFlowTypeName';
import { convertArrayFlowType } from './strategy/convertArrayFlowType';
import { convertLiteralFlowType } from './strategy/convertLiteralFlowType';
import { convertSignatureFlowType } from './strategy/convertSignatureFlowType';
import { convertUnionFlowType } from './strategy/convertUnionFlowType';
import { thunkCreatePrimitivePropertyType } from './strategy/thunkCreatePrimitivePropertyType';

const STRATEGIES:{ [typeName in NamesToBeConverted]:(type:FlowType | any) => PropertyType } = {
  Array: convertArrayFlowType,
  Function: thunkCreatePrimitivePropertyType('func'),
  Object: thunkCreatePrimitivePropertyType('object'),
  React$Component: thunkCreatePrimitivePropertyType('element'),
  React$Element: thunkCreatePrimitivePropertyType('element'),
  React$Node: thunkCreatePrimitivePropertyType('node'),
  any: thunkCreatePrimitivePropertyType('any'),
  bool: thunkCreatePrimitivePropertyType('boolean'),
  boolean: thunkCreatePrimitivePropertyType('boolean'),
  literal: convertLiteralFlowType,
  null: thunkCreatePrimitivePropertyType('empty'),
  number: thunkCreatePrimitivePropertyType('number'),
  signature: convertSignatureFlowType,
  string: thunkCreatePrimitivePropertyType('string'),
  union: convertUnionFlowType,
  void: thunkCreatePrimitivePropertyType('empty'),
};

export function convertFlowPropertyType(propType:FlowType):PropertyType {
  if (STRATEGIES.hasOwnProperty(propType.name)) {
    const strategies:{ [typeName:string]:(flowType:FlowType) => PropertyType } = STRATEGIES as any;
    return strategies[propType.name](propType);
  }
  return createUnsupportedTypeDefinition(propType.name);
}

type NamesToBeConverted = KnownFlowTypeName | KnownReactFlowTypeName;
