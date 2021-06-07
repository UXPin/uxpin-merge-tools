import { importedPropTypesHandler } from '@uxpin/react-docgen-better-proptypes';
import { readFile } from 'fs-extra';
import { defaultHandlers, Handler, parse, ReactDocgenOptions, resolver } from 'react-docgen';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { CommentTags } from '../../../../steps/serialization/component/CommentTags';
import { hasCommentTag } from '../../../../steps/serialization/component/implementation/javascript/hasCommentTag';

interface ReactDocgenOptionsWithBabelConfig extends ReactDocgenOptions {
  babelrc?:boolean;
  configFile?:boolean;
}

// tslint:disable-next-line: max-line-length
const parsers:Array<(file:string, handlers:Handler[], options:ReactDocgenOptionsWithBabelConfig) => ComponentDoc | undefined> = [
  parseWithAnnotation,
  parseDefault,
];

export async function getDefaultComponentFrom(filePath:string):Promise<ComponentDoc> {
  const file:string = await readFile(filePath, { encoding: 'utf8' });
  let componentDoc:ComponentDoc | undefined;
  let error:Error;

  const handlers:Handler[] = [
    ...defaultHandlers,
    importedPropTypesHandler(filePath),
  ];

  // Passing `filename` helps babel to load correct babel configuration file.
  // (NOTE: Without filename option, babel behave as if `babelrc: false` is set)
  // However, react-docgen has a good set of default babel plugins
  // and it has been working for most of customers.
  // I've encountered failure tests from simply setting filename, so,
  // to make sure we are not breaking existing customers integration by this change, we
  // 1. try with react-docgen default babel plugins
  // 2. try with user configured babel config(e.g. .babelrc, babel.config.js)
  const docgenOptions:ReactDocgenOptionsWithBabelConfig[] = [
    {
      babelrc: false,
      configFile: false,
      filename: filePath,
    },
    {
      filename: filePath,
    },
  ];

  for (const options of docgenOptions) {
    for (const parser of parsers) {
      try {
        componentDoc = parser(file, handlers, options);
      } catch (e) {
        error = e;
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

function parseWithAnnotation(
    file:string, handlers:Handler[], options:ReactDocgenOptionsWithBabelConfig):ComponentDoc | undefined {
  const parsed:ComponentDoc[] =
    parse(file, resolver.findAllComponentDefinitions, handlers, options) as ComponentDoc[];

  for (const componentDoc of parsed) {
    if (hasCommentTag(componentDoc.description, CommentTags.UXPIN_COMPONENT)) {
      return componentDoc;
    }
  }
}

function parseDefault(
    file:string, handlers:Handler[], options:ReactDocgenOptionsWithBabelConfig):ComponentDoc | undefined {
  return parse(file, undefined, handlers, options) as ComponentDoc;
}
