
// tslint:disable-next-line:no-var-requires
const parseStaticImports:any = require('parse-static-imports');

export function getParsedImports(imports:string):any[] {
  if (!imports.startsWith('import')) {
    return [];
  }

  return parseStaticImports(imports);
}
