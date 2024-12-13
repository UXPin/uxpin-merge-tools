import { readFile } from 'fs-extra';
import { TransformOptions } from 'babel-core';
import { ComponentDoc } from 'react-docgen-typescript/lib';

import { CommentTags } from '../../CommentTags';
import { hasCommentTag } from './comments/jsdoc-helpers';

interface ReactDocgenOptionsWithBabelConfig extends TransformOptions {
  babelrc?: boolean;
  configFile?: boolean;
}

const parsers: Array<(file: string, options: ReactDocgenOptionsWithBabelConfig) => Promise<ComponentDoc | undefined>> =
  [parseWithAnnotation, parseDefault];

export async function getDefaultComponentFrom(filePath: string): Promise<ComponentDoc> {
  const file: string = await readFile(filePath, { encoding: 'utf8' });
  let componentDoc: ComponentDoc | undefined;
  let error: Error;

  // Passing `filename` helps babel to load correct babel configuration file.
  // (NOTE: Without filename option, babel behave as if `babelrc: false` is set)
  // However, react-docgen has a good set of default babel plugins
  // and it has been working for most of customers.
  // I've encountered failure tests from simply setting filename, so,
  // to make sure we are not breaking existing customers integration by this change, we
  // 1. try with react-docgen default babel plugins
  // 2. try with user configured babel config(e.g. .babelrc, babel.config.js)
  const docgenOptions: TransformOptions[] = [
    {
      babelrc: false,
      filename: filePath,
    },
    {
      filename: filePath,
    },
  ];

  for (const options of docgenOptions) {
    for (const parser of parsers) {
      try {
        componentDoc = await parser(file, options);
      } catch (e) {
        error = e as Error;
      }

      if (componentDoc) {
        return componentDoc;
      }
    }
  }

  if (!componentDoc) {
    throw error! || new Error(`Component not found in file: ${filePath}`);
  }

  return componentDoc;
}

async function parseWithAnnotation(file: string, options: TransformOptions): Promise<ComponentDoc | undefined> {
  const docgen = await require('../../../../../../esm_modules-bridge/react-docgen-bridge')();
  const parsed: ComponentDoc[] = docgen.parse(file, {
    resolver: new docgen.builtinResolvers.FindAllDefinitionsResolver(),
    builtinImporters: docgen.makeFsImporter(),
    babelOptions: options,
  }) as ComponentDoc[];

  for (const componentDoc of parsed) {
    if (hasCommentTag(componentDoc.description, CommentTags.UXPIN_COMPONENT)) {
      return componentDoc;
    }
  }
}

async function parseDefault(
  file: string,
  options: ReactDocgenOptionsWithBabelConfig
): Promise<ComponentDoc | undefined> {
  const docgen = await require('../../../../../../esm_modules-bridge/react-docgen-bridge')();
  return docgen.parse(file, {
    config: undefined,
    builtinImporters: docgen.makeFsImporter(),
    babelOptions: options,
  })[0] as ComponentDoc;
}
