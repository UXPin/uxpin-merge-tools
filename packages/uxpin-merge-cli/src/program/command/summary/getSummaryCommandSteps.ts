import { getDesignSystemSummary } from '../../../steps/discovery/getDesignSystemSummary';
import { DSMetadata } from '../../DSMeta';
import { printSerializationWarnings } from '../../utils/printSerializationWarnings';
import { Step } from '../Step';

export function getSummaryCommandSteps():Step[] {
  return [
    { exec: printSummary, shouldRun: true },
    { exec: printSerializationWarnings, shouldRun: true },
  ];
}

function printSummary({ result: { categorizedComponents } }:DSMetadata):void {
  console.log(getDesignSystemSummary(categorizedComponents));
}
