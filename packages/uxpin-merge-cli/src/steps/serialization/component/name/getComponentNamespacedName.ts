import { ComponentMetadata } from '../ComponentDefinition';

export function getComponentNamespacedName({ name, namespace }:ComponentMetadata):string {
  if (namespace) {
    return `${namespace.name}.${name}`;
  }

  return name;
}
