import { get } from 'lodash';
import { join, parse } from 'path';
import { resolveProjectPath } from '../../../../../../common/fs/projectFs';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { getComponentNamespacedName } from '../../../name/getComponentNamespacedName';
import { getNamespacedComponentsTree, NamespacedComponentsTree } from './getNamespacedComponentsTree';

export interface VirtualComponentModule {
  path: string;
  moduleSource: string;
}

export interface ComponentPlaceholder {
  name: string;
  [key: string]: ComponentPlaceholder | string;
}

export function generateVirtualModules(components: ComponentDefinition[]): VirtualComponentModule[] {
  const tree: NamespacedComponentsTree = getNamespacedComponentsTree(components);
  return components.map((component) => createVirtualModule(component, tree));
}

function createVirtualModule(component: ComponentDefinition, tree: NamespacedComponentsTree): VirtualComponentModule {
  const exportName: string = component.defaultExported ? 'default' : component.name;

  return {
    moduleSource: `
Object.defineProperty(exports, "__esModule", { value: true });
exports.${exportName} = ${JSON.stringify(createComponentPlaceholder(component, tree))};`,
    // Webpack asks for the module by absolute path, and a component path is
    // relative to the project root - the CLI's working directory, and a
    // virtual project's root.
    path: removeExtensionFromPath(resolveProjectPath(component.info.implementation.path)),
  };
}

function createComponentPlaceholder(
  component: ComponentDefinition,
  tree: NamespacedComponentsTree
): ComponentPlaceholder {
  return get(tree, getComponentNamespacedName(component));
}

function removeExtensionFromPath(path: string): string {
  const { dir, name } = parse(path);
  return join(dir, name);
}
