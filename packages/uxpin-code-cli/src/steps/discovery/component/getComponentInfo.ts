import pReduce = require('p-reduce');
import { join } from 'path';
import { ProjectPaths } from '../paths/ProjectPaths';
import { ComponentInfo } from './ComponentInfo';
import { ComponentPaths } from './ComponentPaths';
import { getDocumentationInfo } from './documentation/getDocumentationInfo';
import { getImplementationInfo } from './implementation/getImplementationInfo';
import { getPresetInfos } from './presets/getPresetInfos';

type AsyncExtender<T> = (object:T) => Promise<T>;

export function getComponentInfo(paths:ProjectPaths, componentDirName:string):Promise<ComponentInfo | null> {
  const componentDirPath:string = join(paths.componentsDirPath, componentDirName);
  const componentPaths:ComponentPaths = { ...paths, componentDirPath, componentDirName };
  return getBasics(componentPaths)
    .then(thunkExtendBasics([
      thunkFillDocumentation(componentPaths),
      thunkFillPresets(componentPaths),
    ]))
    .catch(() => null);
}

function getBasics(componentPaths:ComponentPaths):Promise<ComponentInfo> {
  return getImplementationInfo(componentPaths).then((implementation) => ({
    dirPath: componentPaths.componentDirPath,
    implementation,
  }));
}

function thunkExtendBasics(thunks:Array<AsyncExtender<ComponentInfo>>):AsyncExtender<ComponentInfo> {
  return (info:ComponentInfo) => pReduce(thunks.map((thunk) => thunk(info)), (componentInfo, extension) => ({
    ...componentInfo,
    ...extension,
  }), info);
}

function thunkFillDocumentation(paths:ComponentPaths):AsyncExtender<ComponentInfo> {
  return (info:ComponentInfo) => getDocumentationInfo(paths)
    .then((documentation) => ({ ...info, documentation }))
    .catch(() => info);
}

function thunkFillPresets(paths:ComponentPaths):AsyncExtender<ComponentInfo> {
  return (info:ComponentInfo) => getPresetInfos(paths)
    .then((presets) => ({ ...info, presets }))
    .catch(() => info);
}
