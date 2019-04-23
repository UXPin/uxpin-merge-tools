import { join, parse } from 'path';
import { ComponentInfo } from '../../../../../discovery/component/ComponentInfo';
import { getComponentNameFromPath } from '../../../name/getComponentNameFromPath';

export interface VirtualComponentModule {
  path:string;
  moduleSource:string;
}

export interface ComponentPlaceholder {
  name:string;
}

export function generateVirtualModules(components:ComponentInfo[]):VirtualComponentModule[] {
  return components.map(createVirtualModule);
}

function createVirtualModule(info:ComponentInfo):VirtualComponentModule {
  return ({
    moduleSource: `module.exports = ${JSON.stringify(createComponentPlaceholder(info))};`,
    path: removeExtensionFromPath(info.implementation.path),
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
