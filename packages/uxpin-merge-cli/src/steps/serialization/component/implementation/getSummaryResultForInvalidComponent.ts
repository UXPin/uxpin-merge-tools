import debug from 'debug';

import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ComponentMetadata } from '../ComponentDefinition';
import { getComponentNameFromPath } from '../name/getComponentNameFromPath';
import { ImplSerializationResult } from './ImplSerializationResult';
import { isDefaultExported } from './javascript/isDefaultExported';

const log = debug('uxpin:serialization:error');

export function thunkGetSummaryResultForInvalidComponent(sourcePath: string): (e: Error) => ImplSerializationResult {
  return (originalError) => {
    log(sourcePath, originalError.message);

    const warning: WarningDetails = {
      message: 'Cannot serialize component properties',
      originalError,
      sourcePath,
    };

    const componentName: string = getComponentNameFromPath(sourcePath);
    const componentMetadata: ComponentMetadata = {
      defaultExported: isDefaultExported(sourcePath, componentName),
      name: componentName,
      properties: [],
    };

    return { result: componentMetadata, warnings: [warning] };
  };
}
