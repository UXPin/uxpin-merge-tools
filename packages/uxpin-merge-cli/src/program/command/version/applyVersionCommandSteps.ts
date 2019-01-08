import { Step } from '../Step';
import { getVersionCommandSteps } from './getVersionCommandSteps';

export function applyVersionCommandSteps(steps:Step[]):Step[] {
  return [
    ...getVersionCommandSteps(),
    ...steps,
  ];
}
