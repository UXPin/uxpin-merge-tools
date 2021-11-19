
export interface Import {
  moduleName:string;
  starImport:string;
  namedImports:Array<{ name:string, alias:string }>;
  defaultImport:string;
  sideEffectOnly:boolean;
}

// tslint:disable-next-line:no-var-requires
const parseStaticImports:(imports:string) => Import[] = require('parse-static-imports');

export function getParsedImports(imports:string):Import[] {
  if (!imports.startsWith('import')) {
    return [];
  }

  try {
    return parseStaticImports(imports);
  } catch (e) {
    return [];
  }
}
