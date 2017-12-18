import { FlowType } from '../../../../../../../../types/babylon-ast';
import { PropertyType, PropertyTypeName } from '../../../../ComponentPropertyDefinition';

export function tupleCreatePrimitivePropertyType(targetTypeName:PropertyTypeName):(flowType:FlowType) => PropertyType {
  return () => ({
    name: targetTypeName,
    structure: {},
  });
}
