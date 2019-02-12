import * as safe from 'colors/safe';
import globby = require('globby');
import { flatten } from 'lodash';
import pMap from 'p-map';
import { isArray } from 'util';
import { printError, printLine, printWarning } from '../../../../../utils/console/printLine';
import { CategoryConfig } from '../../../config/CliConfig';

export class InvalidPatternError extends Error {}

export async function getComponentCategoryPaths(projectRoot:string, categoryConfig:CategoryConfig):Promise<string[]> {
  let hasInvalidPatterns:boolean = false;
  const patterns:string[] = isArray(categoryConfig.include) ? categoryConfig.include : [categoryConfig.include];
  const paths:string[][] = await pMap(patterns, async (pattern:string):Promise<string[]> => {
    const newPaths:string[] = await globby(pattern, { cwd: projectRoot });

    if (newPaths.length === 0 && !pattern.startsWith('!')) {
      hasInvalidPatterns = true;
      printWarning(`👉 Pattern ${safe.bold(pattern)} didn't match any files.`);
    }

    return newPaths;
  });

  if (hasInvalidPatterns) {
    printLine('');
    printError(`🚫 Please check your ${safe.bold('uxpin.config.js')} file and fix wrong patterns.`);

    throw new InvalidPatternError();
  }

  return flatten(paths);
}
