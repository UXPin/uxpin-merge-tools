import { ComponentDefinition } from '../ComponentDefinition';

export function getComponentNamespacedName({ name, namespace }:ComponentDefinition):string {
  if (namespace) {
    return `${namespace.name}.${name}`;
  }
  return name;
}
