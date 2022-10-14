import { flatMap } from 'lodash';
import { relative, posix } from 'path';
import { ComponentPresetInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { getUniqPresetImportName } from './getUniqPresetImportName';

export function getSourceFileContentToBundle(tempDirPath: string, components: ComponentDefinition[]): string {
  return getFileBody(tempDirPath, flattenComponentPresetInfos(components));
}

function getFileBody(tempDirPath: string, infos: ComponentPresetInfo[]): string {
  const imports: string = infos.map(thunkGetImport(tempDirPath)).join('\n');
  const exports: string = infos.map(getExport).join('\n');

  return `${imports}

export {
${exports}
};
`;
}

function thunkGetImport(tempDirPath:string):({ path }:ComponentPresetInfo) => string {
  return ({ path }) => (
    `import ${getUniqPresetImportName(path)} from '${posix.normalize(relative(tempDirPath, path).replace(/\\/g, '/'))}';`
  );
}

function getExport({ path }: ComponentPresetInfo): string {
  return `  ${getUniqPresetImportName(path)},`;
}

function flattenComponentPresetInfos(components: ComponentDefinition[]): ComponentPresetInfo[] {
  return flatMap(components, ({ info }) => info.presets || []);
}
