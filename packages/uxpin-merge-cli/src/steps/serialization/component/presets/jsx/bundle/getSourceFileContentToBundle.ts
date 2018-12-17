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

export function getSourceFileContentToBundle(infos:ComponentPresetInfo[]):string {
  return `${fileHead}

${getFileBody(infos)}

${fileTail}`;
}

function getFileBody(infos:ComponentPresetInfo[]):string {
  const imports:string = infos.map(getImport).join('\n');
  const exports:string = infos.map(getExport).join('\n');

  return `${imports}

export {
${exports}
};
`;
}

function getImport({ path }:ComponentPresetInfo):string {
  return `import ${getUniqPresetImportName(path)} from '${path}';`;
}

function getExport({ path }:ComponentPresetInfo):string {
  return `  ${getUniqPresetImportName(path)},`;
}
