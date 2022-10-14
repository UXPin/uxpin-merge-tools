import { ComponentInfo } from '../ComponentInfo';
import { getComponentInfo } from '../getComponentInfo';
import { ComponentCategoryInfo } from './ComponentCategoryInfo';

export async function createCategoryInfo(
  projectRoot: string,
  categoryName: string,
  paths: string[]
): Promise<ComponentCategoryInfo> {
  const componentInfos: Array<ComponentInfo | null> = await Promise.all(
    paths.map((path) => getComponentInfo(projectRoot, path))
  );
  return {
    componentInfos: componentInfos.filter(isComponentInfo),
    name: categoryName,
  };
}

function isComponentInfo(i: ComponentInfo | null): i is ComponentInfo {
  return i !== null;
}
