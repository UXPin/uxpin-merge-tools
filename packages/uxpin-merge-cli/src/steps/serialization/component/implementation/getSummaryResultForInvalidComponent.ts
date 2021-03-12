import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ComponentMetadata } from '../ComponentDefinition';
import { getComponentNameFromPath } from '../name/getComponentNameFromPath';
import { ImplSerializationResult } from './ImplSerializationResult';

export function thunkGetSummaryResultForInvalidComponent(sourcePath:string):(e:Error) => ImplSerializationResult {
  return (originalError) => {
    const warning:WarningDetails = {
      message: 'Cannot serialize component properties',
      originalError,
      sourcePath,
    };

    const componentMetadata:ComponentMetadata = {
      name: getComponentNameFromPath(sourcePath),
      properties: [],
    };

    return { result: componentMetadata, warnings: [warning] };
  };
}
