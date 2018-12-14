import { Step } from '../Step';
import { printCurrentVersionInfo } from '../../utils/version/printCurrentVersion';

export function getVersionCommandSteps():Step[] {
  return [
    { exec: printCurrentVersionInfo, shouldRun: true },
  ];
}
