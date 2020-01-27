import { join, parse } from 'path';
import { isFile } from '../../../../utils/fs/isFile';
import { ComponentPresetInfo } from '../ComponentInfo';
import { ComponentPaths } from '../paths/ComponentPaths';

const STORIES_FILE_SUFFIX:string = '.stories.js';

export async function getStoryInfos(componentPaths:ComponentPaths):Promise<ComponentPresetInfo[]> {
  const storiesFilePath:string = getStoriesFilePath(componentPaths);
  const storiesExist:boolean = await isFile(storiesFilePath);
  return storiesExist ? [{ path: storiesFilePath }] : [];

}

function getStoriesFilePath(paths:ComponentPaths):string {
  const componentName:string = parse(paths.implementationPath).name;
  return join(paths.projectRoot, paths.componentDirPath, componentName + STORIES_FILE_SUFFIX);
}
