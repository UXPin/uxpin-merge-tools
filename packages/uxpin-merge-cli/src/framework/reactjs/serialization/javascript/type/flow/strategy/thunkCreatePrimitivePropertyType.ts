import { PropertyType, PropertyTypeName } from '../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { FlowType } from '../../../../../../../types/babylon-ast';

export function thunkCreatePrimitivePropertyType(targetTypeName:PropertyTypeName):(flowType:FlowType) => PropertyType {
  return () => ({
    name: targetTypeName,
    structure: {},
  });
}
