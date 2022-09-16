import { FlowType } from '../../../../../../../types/babylon-ast';
import { TypeConversionResult } from '../TypeConversionResult';
import { convertFlowPropertyType } from './convertFlowPropertyType';

export function convertFlowPropertyTypeWithWarnings(
  propName: string,
  propType: FlowType
): Promise<TypeConversionResult> {
  return new Promise<TypeConversionResult>((resolve) => {
    resolve({
      result: { type: convertFlowPropertyType(propType) },
      warnings: [],
    });
  });
}
