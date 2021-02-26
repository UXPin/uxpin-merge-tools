import { resolve } from 'path';
import { getStoriesInfo, StoriesInfo } from './getStoriesInfo';

export async function getComponentsFromStories(
    cwd:string, storybookConfigDir:string, storiesPaths:string[]):Promise<StoriesInfo[]> {

  return storiesPaths.reduce((storiesInfos:StoriesInfo[], storiesPath:string) => {
    // @todo: support md|mdx file.
    if (storiesPath.match(/.(md|mdx)$/)) {
      return storiesInfos;
    }

    const storiesInfo:StoriesInfo | null = getStoriesInfo(resolve(cwd, storybookConfigDir, storiesPath));
    if (storiesInfo) { storiesInfos.push(storiesInfo); }
    return storiesInfos;
  }, []);
}
