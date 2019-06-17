import { importedPropTypesHandler } from '@uxpin/react-docgen-better-proptypes';
import { readFile } from 'fs-extra';
import { defaultHandlers, Handler, parse, resolver } from 'react-docgen';
import { ComponentDoc } from 'react-docgen-typescript/lib';

const parsers:Array<(file:string, handlers:Handler[]) => ComponentDoc | undefined> = [
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

  for (const parser of parsers) {
    try {
      componentDoc = parser(file, handlers);
    } catch (e) {
      error = e;
    }

    if (componentDoc) {
      break;
    }
  }

  if (!componentDoc) {
    throw error! || new Error(`Component not found in file: ${filePath}`);
  }

  return componentDoc;
}

function parseWithAnnotation(file:string, handlers:Handler[]):ComponentDoc | undefined {
  const parsed:ComponentDoc[] =
    parse(file, resolver.findAllComponentDefinitions, handlers) as unknown as ComponentDoc[];

  for (const componentDoc of parsed) {
    if (componentDoc.description.includes('@uxpincomponent')) {
      return componentDoc;
    }
  }
}

function parseDefault(file:string, handlers:Handler[]):ComponentDoc | undefined {
  return parse(file, undefined, handlers);
}
