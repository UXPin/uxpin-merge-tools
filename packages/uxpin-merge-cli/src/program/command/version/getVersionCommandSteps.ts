import { printCurrentVersionInfo } from '../../utils/version/printCurrentVersion';
import { Step } from '../Step';

export function getVersionCommandSteps():Step[] {
  return [
    { exec: printCurrentVersionInfo, shouldRun: true },
  ];
}
