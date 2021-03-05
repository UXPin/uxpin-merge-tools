import { ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier } from 'acorn-loose';

export interface ImportedModules {
  [localName:string]:ImportedModule;
}

export interface ImportedModule {
  componentFilePath:string;
  importDefault:boolean;
  name:string;
}

export function getImportedModules(imports:ImportedModules, node:ImportDeclaration):ImportedModules {
  node.specifiers.forEach((specifier:any) => {
    const importDefault:boolean = isImportDefault(specifier);
    const name:string = (importDefault || isImportNamespace) ? specifier.local.name : specifier.imported.name;
    const localName:string = specifier.local.name;

    const importedModule:ImportedModule = {
      componentFilePath: node.source.value,
      importDefault,
      name,
    };
    imports[localName] = importedModule;
  });
  return imports;
}

function isImportDefault(specifier:ImportSpecifier|ImportDefaultSpecifier|ImportNamespaceSpecifier):boolean {
  return specifier.type === 'ImportDefaultSpecifier';
}

function isImportNamespace(specifier:ImportSpecifier|ImportDefaultSpecifier|ImportNamespaceSpecifier):boolean {
  return specifier.type === 'ImportNamespaceSpecifier';
}
