import { WarningDetails } from '../../../../../../../common/warning/WarningDetails';
import { FlowType } from '../../../../../../../types/babylon-ast';
import { TypeConversionResult } from '../TypeConversionResult';
import { convertFlowPropertyType } from './convertFlowPropertyType';

export function convertFlowPropertyTypeWithWarnings(propName:string, propType:FlowType):Promise<TypeConversionResult> {
  return new Promise<TypeConversionResult>((resolve) => {
    resolve({
      result: { type: convertFlowPropertyType(propType) },
      warnings: [],
    });
  }).catch((originalError) => {
    const warning:WarningDetails = {
      message: `Unsupported Flow type of a property '${propName}'`,
      originalError,
    };
    return { result: {}, warnings: [warning] };
  });
}
