import { stringifyWarning } from './stringifyWarning';
import { WarningDetails } from './WarningDetails';

export function stringifyWarnings(warnings: WarningDetails[], includeErrors?: boolean): string {
  return warnings.map((warning) => stringifyWarning(warning, includeErrors)).join('\n');
}
