import { WarningDetails } from '../../../../../../../common/warning/WarningDetails';
import { FlowType } from '../../../../../../../types/babylon-ast';
import { TypeConversionResult } from '../TypeConversionResult';

export function convertFlowPropertyTypeWithWarnings(propName:string, propType:FlowType):Promise<TypeConversionResult> {
  const warning:WarningDetails = {
    message: `Unsupported Flow type of a property '${propName}'`,
  };
  return Promise.resolve({ result: {}, warnings: [warning] });
}
