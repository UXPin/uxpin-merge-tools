import { ImportDeclaration, ImportDefaultSpecifier, ImportSpecifier } from 'acorn-loose';

export interface ImportedModules {
  [localName:string]:ImportedModule;
}

export interface ImportedModule {
  componentFilePath:string;
  importDefault:boolean;
}

export function getImportedModules(imports:ImportedModules, node:ImportDeclaration):ImportedModules {
  node.specifiers.forEach((specifier:any) => {
    const localName:string = specifier.local.name;
    const importedModule:ImportedModule = {
      componentFilePath: node.source.value,
      importDefault: isImportDefault(specifier),
    };
    imports[localName] = importedModule;
  });
  return imports;
}

function isImportDefault(specifier:ImportDefaultSpecifier|ImportSpecifier):boolean {
  switch (specifier.type) {
    case 'ImportDefaultSpecifier':
      return true;
    case 'ImportSpecifier':
      return false;
  }
}
