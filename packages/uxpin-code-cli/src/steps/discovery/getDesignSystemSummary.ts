import safe = require('colors/safe');
import { ComponentInfo } from './component/ComponentInfo';

export function getDesignSystemSummary(componentInfos:ComponentInfo[]):string {
  return componentInfos
    .map((info) =>
      `${safe.bold(info.name)}
    📜 documentation: ${getDocsChecker(info)}
`)
    .join('\n');
}

function getDocsChecker({ documentation }:ComponentInfo):string {
  if (documentation) {
    return safe.green('✔');
  }
  return safe.red('✘');
}
