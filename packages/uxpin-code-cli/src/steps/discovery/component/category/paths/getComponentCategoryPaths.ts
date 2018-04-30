import globby = require('globby');
import { isArray } from 'util';
import { CategoryConfig } from '../../../config/CliConfig';

export function getComponentCategoryPaths(projectRoot:string, categoryConfig:CategoryConfig):Promise<string[]> {
  const patterns:string[] = isArray(categoryConfig.include) ? categoryConfig.include : [categoryConfig.include];
  return globby(patterns, { cwd: projectRoot });
}
