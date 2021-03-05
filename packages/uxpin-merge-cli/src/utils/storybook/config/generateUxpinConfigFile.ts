
import { ensureDir } from 'fs-extra';
import { dirname, resolve } from 'path';
import { inspect } from 'util';
import { STORYBOOK_UXPIN_CONFIG_PATH } from '../../../common/constants';
import { writeToFile } from '../../fs/writeToFile';
import { logger } from '../../logger';
import { getCategoryFromStoriesTitle } from './getCategoryFromStoriesTitle';
import { StoriesInfo } from './getStoriesInfo';
import { resolveComponentPathFromStoriesPath } from './resolveComponentPathFromStoriesPath';

interface CategorizedComponentsPaths {
  [category:string]:string[];
}

interface UXPinConfigCategory {
  name:string;
  include:string[];
}

export async function generateUxpinConfigFile(cwd:string, storiesInfos:StoriesInfo[]):Promise<void> {
  const categorizedComponentsPaths:CategorizedComponentsPaths =
    storiesInfos.reduce((comps:CategorizedComponentsPaths, storiesInfo:StoriesInfo) => {
      const category:string = getCategoryFromStoriesTitle(storiesInfo.title);
      const path:string | null = resolveComponentPathFromStoriesPath(
        cwd, storiesInfo.componentFilePath, storiesInfo.storiesPath);

      if (!path) {
        logger.debug(`Failed to find a path for component ${storiesInfo.component}`);
        return comps;
      }

      comps[category] ? comps[category].push(path) : comps[category] = [path];
      return comps;
    }, {});

  const categories:UXPinConfigCategory[] = Object.keys(categorizedComponentsPaths).map((category:string) => {
    return {
      include: categorizedComponentsPaths[category],
      name: category,
    };
  });

  const content:string =
`module.exports = {
  components: {
    categories: ${inspect(categories)},
  },
  name: 'Design System',
};`;

  const outputPath:string = resolve(cwd, STORYBOOK_UXPIN_CONFIG_PATH);
  await ensureDir(dirname(outputPath));
  return writeToFile(outputPath, content);
}
