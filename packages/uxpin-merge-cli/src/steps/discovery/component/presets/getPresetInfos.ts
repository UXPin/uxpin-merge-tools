import { readdir } from 'fs-extra';
import pReduce = require('p-reduce');
import { join, relative } from 'path';
import { isFile } from '../../../../utils/fs/isFile';
import { ComponentPresetInfo } from '../ComponentInfo';
import { ComponentPaths } from '../paths/ComponentPaths';
import { filterPresets } from './filterPresets';
import { sortPresets } from './sortPresets';

const PRESETS_DIR:string = 'presets';

export function getPresetInfos(componentPaths:ComponentPaths):Promise<ComponentPresetInfo[]> {
  return getFilePaths(join(componentPaths.projectRoot, componentPaths.componentDirPath, PRESETS_DIR))
    .then((paths) => getRelativePaths(componentPaths.projectRoot, paths))
    .then(filterPresets)
    .then(sortPresets)
    .then((paths) => paths.map((path) => ({ path })));
}

function getFilePaths(dirPath:string):Promise<string[]> {
  return readdir(dirPath)
    .then((content) => content.map((fileName) => join(dirPath, fileName)))
    .then(skipDirectories)
    .catch(() => []);
}

function skipDirectories(paths:string[]):Promise<string[]> {
  return pReduce(paths.map(getFilePath), (result, filePath) => {
    if (filePath) {
      result.push(filePath);
    }

    return result;
  }, [] as string[]);
}

function getFilePath(path:string):Promise<string | null> {
  return isFile(path).then((value) => value ? path : null).catch(() => null);
}

function getRelativePaths(fromPath:string, paths:string[]):string[] {
  return paths.map((path) => relative(fromPath, path));
}
