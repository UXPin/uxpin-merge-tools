import { get } from 'lodash';
import { join, parse } from 'path';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { getComponentNamespacedName } from '../../../name/getComponentNamespacedName';
import { getNamespacedComponentsTree, NamespacedComponentsTree } from './getNamespacedComponentsTree';

export interface VirtualModule {
  path:string;
  moduleSource:string;
}

export interface ComponentPlaceholder {
  name:string;

  [key:string]:ComponentPlaceholder | string;
}

export function generateVirtualModules(components:ComponentDefinition[]):VirtualModule[] {
  const tree:NamespacedComponentsTree = getNamespacedComponentsTree(components);
  const modules:VirtualModule[] = components.map((component) => createVirtualModule(component, tree));
  modules.push(...createStorybookAddonPlaceholderModules());
  return modules;
}

function createVirtualModule(component:ComponentDefinition, tree:NamespacedComponentsTree):VirtualModule {
  const placeholderObject:string = JSON.stringify(createComponentPlaceholder(component, tree));
  return ({
    moduleSource: `
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ${placeholderObject};
exports.${component.name} = ${placeholderObject};`,
    path: removeExtensionFromPath(component.info.implementation.path),
  });
}

function createComponentPlaceholder(component:ComponentDefinition, tree:NamespacedComponentsTree):ComponentPlaceholder {
  return get(tree, getComponentNamespacedName(component));
}

function removeExtensionFromPath(path:string):string {
  const { dir, name } = parse(path);
  return join(dir, name);
}

function createStorybookAddonPlaceholderModules():VirtualModule[] {
  return [{
    moduleSource: `
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = function() { return undefined; };`,
    path: './node_modules/@storybook/addon-actions/dist/index.js',
  }];
}
