import { readFile } from 'fs-extra';
import { defaultHandlers, Handler, parse } from 'react-docgen';
import { importedPropTypesHandler } from '@uxpin/react-docgen-better-proptypes';
import { ComponentDoc } from 'react-docgen-typescript/lib';

export async function getDefaultComponentFrom(filePath:string):Promise<ComponentDoc> {
  const file:string = await readFile(filePath, { encoding: 'utf8' });

  const handlers:Handler[] = [
    ...defaultHandlers,
    importedPropTypesHandler(filePath),
  ];

  return parse(file, undefined, handlers);
}
