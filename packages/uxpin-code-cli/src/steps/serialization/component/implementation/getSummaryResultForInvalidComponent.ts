import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { getComponentNameFromPath } from '../name/getComponentNameFromPath';
import { ImplSerializationResult } from './ImplSerializationResult';

export function getSummaryResultForInvalidComponent(sourcePath:string):(e:Error) => ImplSerializationResult {
  return (originalError) => {
    const warning:WarningDetails = {
      message: 'Cannot serialize component properties',
      originalError,
      sourcePath,
    };
    return { result: { name: getComponentNameFromPath(sourcePath), properties: [] }, warnings: [warning] };
  };
}
