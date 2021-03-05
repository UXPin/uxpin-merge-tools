import { ensureDir } from 'fs-extra';
import { dirname, resolve } from 'path';
import { inspect } from 'util';
import { STORYBOOK_STORIES_MAP_PATH } from '../../../common/constants';
import { writeToFile } from '../../fs/writeToFile';
import { StoriesInfo } from './getStoriesInfo';

export interface ComponentsStoriesMap {
  [componentName:string]:StoriesInfo;
}

export async function generateComponentsStoriesMapFile(cwd:string, storiesInfos:StoriesInfo[]):Promise<void> {
  const map:ComponentsStoriesMap = storiesInfos.reduce(
    (componentsStoriesMap:ComponentsStoriesMap, storiesInfo:StoriesInfo) => {
      componentsStoriesMap[storiesInfo.component] = storiesInfo;
      return componentsStoriesMap;
    }, {});

  const outputPath:string = resolve(cwd, STORYBOOK_STORIES_MAP_PATH);
  await ensureDir(dirname(outputPath));
  return writeToFile(outputPath, `module.exports = ${inspect(map)}`);
}
