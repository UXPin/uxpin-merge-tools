import { flatMap } from 'lodash';
import { relative } from 'path';
import { ComponentPresetInfo } from '../../../../../../steps/discovery/component/ComponentInfo';
import { ComponentDefinition } from '../../../../../../steps/serialization/component/ComponentDefinition';
import { getUniqPresetImportName } from './getUniqPresetImportName';

export function getSourceFileContentToBundle(tempDirPath:string, components:ComponentDefinition[]):string {
  return getFileBody(tempDirPath, flattenComponentPresetInfos(components));
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

function flattenComponentPresetInfos(components:ComponentDefinition[]):ComponentPresetInfo[] {
  return flatMap(components, ({ info }) => (info.presets || []));
}
