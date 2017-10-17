import safe = require('colors/safe');
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { ComponentInfo } from './component/ComponentInfo';

export function getDesignSystemSummary(components:ComponentDefinition[]):string {
  return components.map((component) => `${safe.bold(component.name)}
    📜 documentation: ${getDocsChecker(component)}
`).join('\n');
}

function getDocsChecker({ documentation }:ComponentInfo):string {
  if (documentation) {
    return safe.green('✔');
  }
  return safe.red('✘');
}
