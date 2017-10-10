import { parse, Syntax, Token } from 'markdown-to-ast';

import { readFile } from '../../../../utils/fs/readFile';
import { ComponentExample } from './ComponentExample';

interface TokenWithValue extends Token {
  value:string;
}

export function serializeExamples(filePath:string):Promise<ComponentExample[]> {
  return readFile(filePath, { encoding: 'utf8' })
    .then((content) => parse(content).children
      .filter((node) => node.type === Syntax.CodeBlock && isSupportedLang(node.lang) && node.value)
      .map((codeBlock:TokenWithValue) => ({ code: codeBlock.value })));
}

function isSupportedLang(lang?:string):boolean {
  return !!lang && [
    'javascript',
    'js',
    'jsx',
    'typescript',
    'ts',
    'tsx',
  ].includes(lang);
}
