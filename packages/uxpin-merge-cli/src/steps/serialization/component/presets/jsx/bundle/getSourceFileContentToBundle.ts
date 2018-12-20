import { relative } from 'path';
import { ComponentPresetInfo } from '../../../../../discovery/component/ComponentInfo';
import { getUniqPresetImportName } from './getUniqPresetImportName';

const fileHead:string = '/* @jsx __uxpinParsePreset */';
const fileTail:string = `
function __uxpinParsePreset(type, props, ...children) {
  const displayName = typeof type === 'function'
        ? type.displayName || type.name || 'Unknown'
        : type;
   return {
    name: displayName,
    props: JSON.parse(JSON.stringify(props)),
    children: children,
  };
}
`;

export function getSourceFileContentToBundle(tempDirPath:string, infos:ComponentPresetInfo[]):string {
  return `${fileHead}

${getFileBody(tempDirPath, infos)}

${fileTail}`;
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
