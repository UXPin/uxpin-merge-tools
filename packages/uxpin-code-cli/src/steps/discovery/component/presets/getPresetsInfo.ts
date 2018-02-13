import pReduce = require('p-reduce');
import { join } from 'path';
import { isFile } from '../../../../utils/fs/isFile';
import { readDir } from '../../../../utils/fs/readDir';
import { tapPromise } from '../../../../utils/promise/tapPromise';
import { ComponentPresetsInfo } from '../ComponentInfo';
import { ComponentPaths } from '../ComponentPaths';
import { filterPresets } from './filterPresets';
import { sortPresets } from './sortPresets';

const PRESETS_DIR:string = 'presets';

export function getPresetsInfo(componentPaths:ComponentPaths):Promise<ComponentPresetsInfo> {
  return getFiles(join(componentPaths.componentsDirPath, PRESETS_DIR))
    .then(filterPresets)
    .then(sortPresets)
    .then((paths) => ({ paths }));
}

function getFiles(path:string):Promise<string[]> {
  return readDir(path)
    .then((content) => content.map(tapPromise(isFile)))
    .then((files) => pReduce(files, (result, file) => {
      result.push(file);
      return result;
    }, [] as string[]))
    .catch(() => []);
}
