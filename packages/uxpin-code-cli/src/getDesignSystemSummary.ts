import { getDesignSystemComponentLocations } from './components/getDesignSystemComponentLocations';

export function getDesignSystemSummary():Promise<string> {
  return getDesignSystemComponentLocations()
    .then((components) => components.join('\n'));
}
