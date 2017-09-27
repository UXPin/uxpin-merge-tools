import safe = require('colors/safe');
import { WarningDetails } from './WarningDetails';

export function stringifyWarning(warning:WarningDetails, includeError:boolean = false):string {
  let result:string = safe.yellow('warning ') + warning.message + ' in:\n';
  if (warning.sourcePath) {
    result += safe.blue(warning.sourcePath) + '\n';
  }
  if (includeError && warning.originalError) {
    if (warning.originalError.stack) {
      result += warning.originalError.stack + '\n';
    } else {
      result += warning.originalError + '\n';
    }
  }
  return result;
}
