import { parse, Syntax } from 'markdown-to-ast';

import { readFile } from '../../../../utils/fs/readFile';
import { ComponentExample } from './ComponentExample';

export function getExamples(filePath:string):Promise<ComponentExample[]> {
  return readFile(filePath, { encoding: 'utf8' })
    .then((content) => parse(content).children
      .filter((node) => node.type === Syntax.CodeBlock && isSupportedLang(node.lang) && node.value)
      .map((codeBlock) => ({ code: codeBlock.value || '' })));
}

function isSupportedLang(lang?:string):boolean {
  return !!lang && [
    'javascript',
    'jsx',
    'typescript',
    'tsx',
  ].indexOf(lang) > -1;
}
