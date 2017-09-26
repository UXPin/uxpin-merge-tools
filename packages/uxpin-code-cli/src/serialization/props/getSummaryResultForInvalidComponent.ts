import { WarningDetails } from '../../common/warning/WarningDetails';
import { PropsSerializationResult } from './PropsSerializationResult';

export function getSummaryResultForInvalidComponent(sourcePath:string):(error:Error) => PropsSerializationResult {
  return (originalError) => {
    const warning:WarningDetails = {
      message: 'Cannot serialize component properties',
      originalError,
      sourcePath,
    };
    return { properties: [], warnings: [warning] };
  };
}
