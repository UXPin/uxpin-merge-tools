import { FlowType, KnownFlowTypeName } from '../../../../../../../types/babylon-ast';
import { PropertyType } from '../../../ComponentPropertyDefinition';
import { createUnsupportedTypeDefinition } from '../../../createUnsupportedTypeDefinition';
import { KnownReactFlowTypeName } from './KnownReactFlowTypeName';
import { convertArrayFlowType } from './strategy/convertArrayFlowType';
import { convertSignatureFlowType } from './strategy/convertSignatureFlowType';
import { tupleCreatePrimitivePropertyType } from './strategy/tupleCreatePrimitivePropertyType';

const STRATEGIES:Partial<{ [typeName in NamesToBeConverted]:(type:FlowType) => PropertyType }> = {
  Array: convertArrayFlowType,
  Function: tupleCreatePrimitivePropertyType('func'),
  any: tupleCreatePrimitivePropertyType('any'),
  bool: tupleCreatePrimitivePropertyType('boolean'),
  boolean: tupleCreatePrimitivePropertyType('boolean'),
  number: tupleCreatePrimitivePropertyType('number'),
  signature: convertSignatureFlowType,
  string: tupleCreatePrimitivePropertyType('string'),
  void: tupleCreatePrimitivePropertyType('void'),
};

export function convertFlowPropertyType(propType:FlowType):PropertyType {
  if (STRATEGIES.hasOwnProperty(propType.name)) {
    const strategies:{ [typeName:string]:(flowType:FlowType) => PropertyType } = STRATEGIES as any;
    return strategies[propType.name](propType);
  }
  return createUnsupportedTypeDefinition(propType.name);
}

type NamesToBeConverted = KnownFlowTypeName | KnownReactFlowTypeName;
