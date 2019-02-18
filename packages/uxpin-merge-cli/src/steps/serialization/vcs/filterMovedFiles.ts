import { flatMap, reduce } from 'lodash';
import { ComponentCategory } from '../component/categories/ComponentCategory';
import { MovedFilePathsMap } from '../DesignSystemSnapshot';

export function filterMovedFiles(
  movedFiles:MovedFilePathsMap,
  categorizedComponents:ComponentCategory[],
):MovedFilePathsMap {
  const componentsPaths:string[] = flatMap(categorizedComponents, (category) => (
    category.components.map((component) => component.info.implementation.path)
  ));

  return reduce(movedFiles, (filesMap, newPath, sourcePath) => {
    if (componentsPaths.includes(newPath)) {
      return {
        ...filesMap,
        [sourcePath]: newPath,
      };
    }

    return filesMap;
  }, {});
}
