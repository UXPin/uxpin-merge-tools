import { ensureDir } from 'fs-extra';
import { dirname, resolve } from 'path';
import { inspect } from 'util';
import { STORYBOOK_STORIES_MAP_PATH } from '../../../common/constants';
import { writeToFile } from '../writeToFile';
import { StoriesInfo } from './getStoriesInfo';

export interface ComponetsStoriesMap {
  [componentName:string]:StoriesInfo;
}

export async function generateComponentsStoriesMapFile(cwd:string, storiesInfos:StoriesInfo[]):Promise<void> {
  const map:ComponetsStoriesMap = storiesInfos.reduce(
    (componetsStoriesMap:ComponetsStoriesMap, storiesInfo:StoriesInfo) => {
      componetsStoriesMap[storiesInfo.component] = storiesInfo;
      return componetsStoriesMap;
    }, {});

  const outputPath:string = resolve(cwd, STORYBOOK_STORIES_MAP_PATH);
  await ensureDir(dirname(outputPath));
  return writeToFile(outputPath, `module.exports = ${inspect(map)}`);
}
