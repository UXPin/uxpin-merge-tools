import { ExportDefaultDeclaration, ImportDeclaration, ModuleNode, parse } from 'acorn-loose';
import { readFileSync } from 'fs-extra';
import { isEmpty } from 'lodash';
import { logger } from '../../logger';
import { ExportDefaultInfo, getExportDefaultInfo } from './acornAnalyzers/getExportDefaultInfo';
import { getImportedModules, ImportedModule, ImportedModules } from './acornAnalyzers/getImportedModules';
import { getComponentNameFromStoriesTitle } from './getComponentNameFromStoriesTitle';

export interface StoriesInfo {
  title:string;
  component:string;
  componentFilePath:string;
  importDefault:boolean;
  storiesPath:string;
}

export function getStoriesInfo(storiesPath:string):StoriesInfo | null {
  let exportDefaultInfo:ExportDefaultInfo | undefined;
  let imports:ImportedModules = {};

  const content:string = readFileSync(storiesPath, { encoding: 'utf8' });
  const ast:ModuleNode = parse(content, { sourceType: 'module', ecmaVersion: 2020 });

  if (ast.body && ast.body.length > 0) {
    ast.body.forEach((node:(ExportDefaultDeclaration|ImportDeclaration)) => {
      switch (node.type) {
        // default export that describes component and title
        case 'ExportDefaultDeclaration':
          exportDefaultInfo = getExportDefaultInfo(node);
          break;
        // Detect component import name/path
        case 'ImportDeclaration':
          imports = getImportedModules(imports, node);
          break;
      }
    });
  }

  // We only support stories.js file defining default export
  // with both `title` and `component` attributes.
  if (!exportDefaultInfo || isEmpty(exportDefaultInfo.title)) {
    logger.debug(`Failed to get StoriesInfo for ${storiesPath} because 'title' is missing in default export`);
    return null;
  }

  const componentName:string = exportDefaultInfo.localComponentName ||
    getComponentNameFromStoriesTitle(exportDefaultInfo.title);
  const component:ImportedModule = imports[componentName];

  if (!component) {
    logger.debug(`Failed to get StoriesInfo for ${storiesPath} because module ${componentName} is missing in the file`);
    return null;
  }

  const storiesInfo:StoriesInfo = {
    component: component.name,
    componentFilePath: component.componentFilePath,
    importDefault: component.importDefault,
    storiesPath,
    title: exportDefaultInfo.title,
  };
  return storiesInfo;
}
