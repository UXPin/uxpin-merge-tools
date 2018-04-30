import { CategoryConfig } from '../../config/CliConfig';
import { getConfiguration } from '../../config/getConfiguration';
import { ComponentCategoryInfo } from './ComponentCategoryInfo';
import { createCategoryInfo } from './createCategoryInfo';
import { getComponentCategoryPaths } from './paths/getComponentCategoryPaths';

export async function getComponentCategoryInfos(projectRoot:string):Promise<ComponentCategoryInfo[]> {
  const categoryConfigs:CategoryConfig[] = getConfiguration(projectRoot).components.categories;
  return Promise.all(categoryConfigs.map(async (config) => {
    const paths:string[] = await getComponentCategoryPaths(projectRoot, config);
    return createCategoryInfo(projectRoot, config.name, paths);
  }));
}
