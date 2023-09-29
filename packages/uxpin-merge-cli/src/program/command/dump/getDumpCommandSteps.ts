import { stringifyWarnings } from '../../../common/warning/stringifyWarnings';
import { DSMetadata } from '../../DSMeta';
import { Step } from '../Step';

export function getDumpCommandSteps(): Step[] {
  return [{ exec: printDump, shouldRun: true }];
}

function printDump({ warnings, result }: DSMetadata): void {
  const INDENT = 2;
  console.log(JSON.stringify(result, null, INDENT));
  console.error(stringifyWarnings(warnings, true));
}
