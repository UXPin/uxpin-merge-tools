import { set } from 'lodash';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { getComponentNamespacedName } from '../../../name/getComponentNamespacedName';
import { ComponentPlaceholder } from './generateVirtualModules';

export interface NamespacedComponentsTree {
  [key: string]: ComponentPlaceholder;
}

export function getNamespacedComponentsTree(components: ComponentDefinition[]): NamespacedComponentsTree {
  return components.reduce<NamespacedComponentsTree>((tree, component) => {
    const namespacedName: string = getComponentNamespacedName(component);
    set(tree, `${namespacedName}.name`, namespacedName);
    return tree;
  }, {});
}
