import { Warned } from './Warned';
import { WarningDetails } from './WarningDetails';

export function getWarnedResult<T>(result: T, warnings?: WarningDetails[]): Warned<T> {
  return {
    result,
    warnings: warnings || [],
  };
}
