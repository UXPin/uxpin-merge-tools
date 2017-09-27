import { getDesignSystemComponentInfos } from './discovery/components/getDesignSystemComponentInfos';

export function getDesignSystemSummary():Promise<string> {
  return getDesignSystemComponentInfos()
    .then((componentInfos) => componentInfos.map((componentInfo) => componentInfo.name).join('\n'));
}
