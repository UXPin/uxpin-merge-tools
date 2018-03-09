import { readDir } from '../../../utils/fs/readDir';
import { getProjectPaths } from '../paths/getProjectPaths';
import { ProjectPaths } from '../paths/ProjectPaths';
import { ComponentCategoryInfo } from './ComponentCategoryInfo';
import { ComponentInfo } from './ComponentInfo';
import { getComponentInfo } from './getComponentInfo';

const DEFAULT_CATEGORY_NAME:string = 'Uncategorized';

export async function getComponentCategoryInfos(cwd:string):Promise<ComponentCategoryInfo[]> {
  return [{
    componentInfos: await getDesignSystemComponentInfos(cwd),
    name: DEFAULT_CATEGORY_NAME,
  }];
}

async function getDesignSystemComponentInfos(cwd:string):Promise<ComponentInfo[]> {
  const projectPaths:ProjectPaths = await getProjectPaths(cwd);
  const componentsDirContent:string[] = await readDir(projectPaths.componentsDirPath);
  return getComponentInfos(projectPaths, componentsDirContent);
}

function getComponentInfos(projectPaths:ProjectPaths, fileNames:string[]):Promise<ComponentInfo[]> {
  return Promise.all(fileNames.map((fileName) => getComponentInfo(projectPaths, fileName)))
    .then((infoList) => infoList.filter(Boolean) as ComponentInfo[]);
}
