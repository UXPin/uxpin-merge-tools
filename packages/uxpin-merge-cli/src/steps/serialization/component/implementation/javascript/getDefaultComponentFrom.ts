import { importedPropTypesHandler } from '@uxpin/react-docgen-better-proptypes';
import { readFile } from 'fs-extra';
import { defaultHandlers, Handler, parse, ReactDocgenOptions, resolver } from 'react-docgen';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { CommentTags } from '../../CommentTags';
import { hasCommentTag } from './hasCommentTag';

interface ReactDocgenOptionsWithBabelConfig extends ReactDocgenOptions {
  babelrc:boolean;
  configFile:boolean;
}

// tslint:disable-next-line: max-line-length
const parsers:Array<(file:string, handlers:Handler[], options:ReactDocgenOptionsWithBabelConfig | undefined) => ComponentDoc | undefined> = [
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

  // react-docgen has a default set of babel plugins, so trying to use it.
  // By default, react-docgen try to use users babel config file if it exists.
  // But there is a case it doesn't work... e.g. storybook/design-system has babel.config.js
  // which includes preset-typescript. Because of it, react-docgen can't serialize js|jsx file.
  const docgenOptions:Array<ReactDocgenOptionsWithBabelConfig | undefined> = [
    undefined,
    {
      babelrc: false,
      configFile: false,
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
    file:string, handlers:Handler[], options:ReactDocgenOptionsWithBabelConfig | undefined):ComponentDoc | undefined {
  const parsed:ComponentDoc[] =
    parse(file, resolver.findAllComponentDefinitions, handlers, options) as ComponentDoc[];

  for (const componentDoc of parsed) {
    if (hasCommentTag(componentDoc.description, CommentTags.UXPIN_COMPONENT)) {
      return componentDoc;
    }
  }
}

function parseDefault(
    file:string, handlers:Handler[], options:ReactDocgenOptionsWithBabelConfig | undefined):ComponentDoc | undefined {
  return parse(file, undefined, handlers, options) as ComponentDoc;
}
