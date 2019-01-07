import { reduce } from 'lodash';
import { relative } from 'path';
import { ComponentCategoryInfo } from '../../../../../discovery/component/category/ComponentCategoryInfo';
import { ComponentInfo, ComponentPresetInfo } from '../../../../../discovery/component/ComponentInfo';
import { getUniqPresetImportName } from './getUniqPresetImportName';

export function getSourceFileContentToBundle(tempDirPath:string, infos:ComponentCategoryInfo[]):string {
  return getFileBody(tempDirPath, flattenComponentPresetInfos(infos));
}

function getFileBody(tempDirPath:string, infos:ComponentPresetInfo[]):string {
  const imports:string = infos.map(thunkGetImport(tempDirPath)).join('\n');
  const exports:string = infos.map(getExport).join('\n');

  return `${imports}

export {
${exports}
};
`;
}

function thunkGetImport(tempDirPath:string):({ path }:ComponentPresetInfo) => string {
  return ({ path }) => (
    `import ${getUniqPresetImportName(path)} from '${relative(tempDirPath, path)}';`
  );
}

function getExport({ path }:ComponentPresetInfo):string {
  return `  ${getUniqPresetImportName(path)},`;
}

function flattenComponentPresetInfos(categoryInfos:ComponentCategoryInfo[]):ComponentPresetInfo[] {
  return reduce<ComponentCategoryInfo, ComponentPresetInfo[]>(categoryInfos, (flattenInfos, categoryInfo) => {
    flattenInfos.push(...reduce<ComponentInfo, ComponentPresetInfo[]>(categoryInfo.componentInfos, (infos, info) => {
      if (info.presets) {
        infos.push(...info.presets);
      }
      return infos;
    }, []));
    return flattenInfos;
  }, []);
}
