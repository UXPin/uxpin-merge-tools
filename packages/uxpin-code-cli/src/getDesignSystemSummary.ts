import { getDesignSystemComponents } from './helpers/getDesignSystemComponents';

export function getDesignSystemSummary():Promise<string> {
  return getDesignSystemComponents()
    .then((components) => components.join('\n'));
}
