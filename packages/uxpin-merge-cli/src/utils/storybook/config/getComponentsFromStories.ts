import { getStoriesInfo, StoriesInfo } from './getStoriesInfo';

export async function getComponentsFromStories(storiesPaths:string[]):Promise<StoriesInfo[]> {
  return storiesPaths.reduce((storiesInfos:StoriesInfo[], storiesPath:string) => {
    // @todo: support md|mdx file.
    // https://storybook.js.org/docs/react/api/mdx
    if (storiesPath.match(/.(md|mdx)$/)) {
      return storiesInfos;
    }

    const storiesInfo:StoriesInfo | null = getStoriesInfo(storiesPath);
    if (storiesInfo) { storiesInfos.push(storiesInfo); }
    return storiesInfos;
  }, []);
}
