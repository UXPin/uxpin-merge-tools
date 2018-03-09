import safe = require('colors/safe');
import { ComponentCategory } from '../serialization/component/categories/ComponentCategory';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { DesignSystemComponents } from '../serialization/DesignSystemSnapshot';

export function getDesignSystemSummary({ categories }:DesignSystemComponents):string {
  return categories.map(describeCategory).join('\n');
}

function describeCategory(category:ComponentCategory):string {
  return `${safe.bold(category.name)}
${category.components.map(describeComponent).join('')}`;
}

function describeComponent(component:ComponentDefinition):string {
  return `
    ${safe.bold(component.name)}
        📜 documentation: ${booleanToCheckmark(!!component.info.documentation)}
        💡 examples: ${booleanToCheckmark(component.documentation.examples.length > 0)}
        🎛  presets: ${booleanToCheckmark(component.presets.length > 0)}
`;
}

function booleanToCheckmark(value:boolean):string {
  if (value) {
    return safe.green('✔');
  }
  return safe.red('✘');
}
