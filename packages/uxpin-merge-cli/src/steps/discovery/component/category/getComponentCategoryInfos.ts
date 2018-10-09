import { CategoryConfig } from '../../config/CliConfig';
import { getConfiguration } from '../../config/getConfiguration';
import { ProjectPaths } from '../../paths/ProjectPaths';
import { ComponentCategoryInfo } from './ComponentCategoryInfo';
import { createCategoryInfo } from './createCategoryInfo';
import { getComponentCategoryPaths } from './paths/getComponentCategoryPaths';
import { sortFilePaths } from './paths/sortFilePaths';

export async function getComponentCategoryInfos(projectPaths:ProjectPaths):Promise<ComponentCategoryInfo[]> {
  const categoryConfigs:CategoryConfig[] = getConfiguration(projectPaths.configPath).components.categories;
  return Promise.all(categoryConfigs.map(async (config) => {
    const paths:string[] = await getComponentCategoryPaths(projectPaths.projectRoot, config);
    return createCategoryInfo(projectPaths.projectRoot, config.name, sortFilePaths(paths));
  }));
}
