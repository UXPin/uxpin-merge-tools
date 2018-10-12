import { getDesignSystemSummary } from '../../../steps/discovery/getDesignSystemSummary';
import { DSMetadata } from '../../DSMeta';
import { Step } from '../Step';
import { printSerializationWarnings } from '../../utils/printSerializationWarnings';

export function getSummaryCommandSteps():Step[] {
  return [
    { exec: printSummary, shouldRun: true },
    { exec: printSerializationWarnings, shouldRun: true },
  ];
}

function printSummary({ result: { categorizedComponents } }:DSMetadata):void {
  console.log(getDesignSystemSummary(categorizedComponents));
}
