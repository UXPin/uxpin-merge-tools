import { readFile } from 'fs-extra';
import { parse, Syntax } from '@textlint/markdown-to-ast';
import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ExamplesSerializationResult } from './ExamplesSerializationResult';
import { TxtNode } from '@textlint/ast-node-types';

interface TokenWithValue extends TxtNode {
  value: string;
}

export function serializeExamples(filePath: string): Promise<ExamplesSerializationResult> {
  return readFile(filePath, { encoding: 'utf8' })
    .then((content) =>
      parse(content)
        .children.filter(isSupportedLangTokenWithValue)
        .map((codeBlock: TxtNode) => ({ code: codeBlock.value }))
    )
    .then((examples) => ({ result: examples, warnings: [] }))
    .catch(thunkGetResultForInvalidExamples(filePath));
}

function isSupportedLangTokenWithValue(node: TxtNode): node is TokenWithValue {
  return node.type === Syntax.CodeBlock && isSupportedLang(node.lang) && !!node.value;
}

function isSupportedLang(lang?: string): boolean {
  return !!lang && ['javascript', 'js', 'jsx', 'typescript', 'ts', 'tsx'].includes(lang);
}

function thunkGetResultForInvalidExamples(sourcePath: string): (e: Error) => ExamplesSerializationResult {
  return (originalError) => {
    const warning: WarningDetails = {
      message: 'Cannot serialize component examples',
      originalError,
      sourcePath,
    };
    return { result: [], warnings: [warning] };
  };
}
