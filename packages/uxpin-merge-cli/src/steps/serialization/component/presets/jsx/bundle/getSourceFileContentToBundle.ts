import { flatMap } from 'lodash';
import { relative, posix } from 'path';
import { resolveProjectPath } from '../../../../../../common/fs/projectFs';
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

function thunkGetImport(tempDirPath: string): ({ path }: ComponentPresetInfo) => string {
  return ({ path }) =>
    // Preset paths are relative to the project root, which for the CLI is also
    // the working directory. A project that has no directory resolves them
    // against its own root instead, so the import points at the preset either
    // way.
    `import ${getUniqPresetImportName(path)} from '${posix.normalize(
      relative(tempDirPath, resolveProjectPath(path)).replace(/\\/g, '/')
    )}';`;
}

function getExport({ path }: ComponentPresetInfo): string {
  return `  ${getUniqPresetImportName(path)},`;
}

function flattenComponentPresetInfos(components: ComponentDefinition[]): ComponentPresetInfo[] {
  return flatMap(components, ({ info }) => info.presets || []);
}
