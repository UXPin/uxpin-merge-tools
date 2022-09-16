import * as v5 from 'uuid/v5';

const SANITIZE_IMPORT_NAME = /-/g;

export function getUniqPresetImportName(path: string): string {
  return `Preset${v5(path, v5.URL).replace(SANITIZE_IMPORT_NAME, '')}`;
}
