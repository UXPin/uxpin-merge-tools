import cleanStacktrace = require('clean-stacktrace');
import cleanStacktraceRelativePaths = require('clean-stacktrace-relative-paths');
import safe = require('colors/safe');
import { WarningDetails } from './WarningDetails';

export function stringifyWarning(warning:WarningDetails, includeError:boolean = false):string {
  const { message, sourcePath, originalError } = warning;
  // tslint:ignore-next-line
  let result:string = safe.yellow('warning ') + message + ' in:\n';
  if (sourcePath) {
    // tslint:ignore-next-line
    result += safe.blue(sourcePath) + '\n';
  }
  if (includeError && originalError && originalError.stack) {
    // tslint:ignore-next-line
    result += cleanStacktrace(originalError.stack, cleanStacktraceRelativePaths()) + '\n';
  }
  return result;
}
