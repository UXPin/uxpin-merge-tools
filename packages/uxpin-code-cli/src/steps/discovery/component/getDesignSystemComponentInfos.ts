import { readDir } from '../../../utils/fs/readDir';
import { getProjectPaths } from '../paths/getProjectPaths';
import { ProjectPaths } from '../paths/ProjectPaths';
import { ComponentInfo } from './ComponentInfo';
import { getComponentInfo } from './getComponentInfo';

export function getDesignSystemComponentInfos():Promise<ComponentInfo[]> {
  let projectPaths:ProjectPaths;
  return getProjectPaths()
    .then((paths) => {
      projectPaths = paths;
      return paths.componentsDirPath;
    })
    .then(readDir)
    .then((content) => getComponentInfos(projectPaths, content));
}

function getComponentInfos(projectPaths:ProjectPaths, fileNames:string[]):Promise<ComponentInfo[]> {
  return Promise.all(fileNames.map((fileName) => getComponentInfo(projectPaths, fileName)))
    .then((infoList) => infoList.filter(Boolean) as ComponentInfo[]);
}
