import { FlowType, KnownFlowTypeName } from '../../../../../../../types/babylon-ast';
import { PropertyType } from '../../../ComponentPropertyDefinition';
import { KnownReactFlowTypeName } from './KnownReactFlowTypeName';
import { convertArrayFlowType } from './strategy/convertArrayFlowType';
import { tupleCreatePrimitivePropertyType } from './strategy/tupleCreatePrimitivePropertyType';

// const STRATEGIES:{ [typeName in NamesToBeConverted]:(ropType:FlowType) => PropertyType } = {
const STRATEGIES:any = {
  Array: convertArrayFlowType,
  any: tupleCreatePrimitivePropertyType('any'),
  bool: tupleCreatePrimitivePropertyType('boolean'),
  boolean: tupleCreatePrimitivePropertyType('boolean'),
  number: tupleCreatePrimitivePropertyType('number'),
  string: tupleCreatePrimitivePropertyType('string'),
};

export function convertFlowPropertyType(propType:FlowType):PropertyType {
  if (STRATEGIES.hasOwnProperty(propType.name)) {
    return STRATEGIES[propType.name](propType);
  }
  throw new Error(`Unsupported type '${propType.name}'`);
}

type NamesToBeConverted = KnownFlowTypeName | KnownReactFlowTypeName;
