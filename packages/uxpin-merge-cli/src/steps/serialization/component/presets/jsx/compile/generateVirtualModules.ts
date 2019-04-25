import { join, parse } from 'path';
import { ComponentInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { getComponentNameFromPath } from '../../../name/getComponentNameFromPath';

export interface VirtualComponentModule {
  path:string;
  moduleSource:string;
}

export interface ComponentPlaceholder {
  name:string;
}

export function generateVirtualModules(components:ComponentDefinition[]):VirtualComponentModule[] {
  return components.map(createVirtualModule);
}

function createVirtualModule(component:ComponentDefinition):VirtualComponentModule {
  return ({
    moduleSource: `
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ${JSON.stringify(createComponentPlaceholder(component.info))};`,
    path: removeExtensionFromPath(component.info.implementation.path),
  });
}

function createComponentPlaceholder(componentInfo:ComponentInfo):ComponentPlaceholder {
  return {
    name: getComponentNameFromPath(componentInfo.implementation.path),
  };
}

function removeExtensionFromPath(path:string):string {
  const { dir, name } = parse(path);
  return join(dir, name);
}
