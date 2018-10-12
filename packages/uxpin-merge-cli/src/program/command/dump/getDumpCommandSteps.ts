import sortobject = require('sortobject');
import { stringifyWarnings } from '../../../common/warning/stringifyWarnings';
import { DSMetadata } from '../../DSMeta';
import { Step } from '../Step';

export function getDumpCommandSteps():Step[] {
  return [
    { exec: printDump, shouldRun: true },
  ];
}

function printDump({ warnings, result }:DSMetadata):void {
  const INDENT:number = 2;
  console.log(JSON.stringify(sortobject(result), null, INDENT));
  console.error(stringifyWarnings(warnings, true));
}
