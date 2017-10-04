import { ComponentInfo } from './component/ComponentInfo';

export function getDesignSystemSummary(componentInfos:ComponentInfo[]):string {
  return componentInfos.map((componentInfo) => componentInfo.name).join('\n');
}
