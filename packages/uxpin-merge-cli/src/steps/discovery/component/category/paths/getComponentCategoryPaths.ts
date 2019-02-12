import * as safe from 'colors/safe';
import globby = require('globby');
import pMap from 'p-map';
import { isArray } from 'util';
import { printError, printLine, printWarning } from '../../../../../utils/console/printLine';
import { CategoryConfig } from '../../../config/CliConfig';

export class InvalidPatternError extends Error {}

const NEGATED_PATTERN_MATCH:string = '!';

export async function getComponentCategoryPaths(projectRoot:string, categoryConfig:CategoryConfig):Promise<string[]> {
  let hasInvalidPatterns:boolean = false;
  const patterns:string[] = isArray(categoryConfig.include) ? categoryConfig.include : [categoryConfig.include];
  const positivePatterns:string [] = patterns.filter((pattern) => !pattern.startsWith(NEGATED_PATTERN_MATCH));

  // First check if each non negated pattern produces any paths
  await pMap(positivePatterns, async (pattern:string):Promise<string[]> => {
    const newPaths:string[] = await globby(pattern, { cwd: projectRoot });

    if (newPaths.length === 0) {
      hasInvalidPatterns = true;
      printWarning(`👉 Pattern ${safe.bold(pattern)} didn't match any files.`);
    }

    return newPaths;
  });

  // If some pattern doesn't provide some files, throw an error as this may result to broken library to be pushed
  // (e.g. when some files won't be commited to the repository)
  if (hasInvalidPatterns) {
    printLine('');
    printError(`🚫 Please check your ${safe.bold('uxpin.config.js')} file and fix wrong patterns.`);

    throw new InvalidPatternError();
  }

  // Finally return paths for all patterns, as this may produce different results than
  // checking each pattern separately
  return globby(patterns, { cwd: projectRoot });
}
