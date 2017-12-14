import { WarningDetails } from '../../../../../../../common/warning/WarningDetails';
import { FlowType } from '../../../../../../../types/babylon-ast';
import { TypeConversionResult } from '../TypeConversionResult';

export function convertFlowPropertyTypeWithWarnings(propName:string, propType:FlowType):Promise<TypeConversionResult> {
  const warning:WarningDetails = {
    message: `Cannot parse Flow type of a property '${propName}' with type: ${propType}`,
  };
  return Promise.reject({ result: {}, warnings: [warning] });
}
