import * as v5 from 'uuid/v5';

const SANITIZE_IMPORT_NAME:RegExp = /-/g;

export function getUniqStorySetImportName(storiesFilePath:string):string {
  return `Story${v5(storiesFilePath, v5.URL).replace(SANITIZE_IMPORT_NAME, '')}`;
}
