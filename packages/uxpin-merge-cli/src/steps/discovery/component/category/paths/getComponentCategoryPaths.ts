import * as safe from 'colors/safe';
import globby = require('globby');
import { flatten, intersection } from 'lodash';
import pMap from 'p-map';
import { isArray } from 'util';
import { printWarning } from '../../../../../utils/console/printLine';
import { CategoryConfig } from '../../../config/CliConfig';
import { sortFilePaths } from './sortFilePaths';

const NEGATED_PATTERN_MATCH:string = '!';

export async function getComponentCategoryPaths(projectRoot:string, categoryConfig:CategoryConfig):Promise<string[]> {
  let hasInvalidPatterns:boolean = false;
  const patterns:string[] = isArray(categoryConfig.include) ? categoryConfig.include : [categoryConfig.include];
  const positivePatterns:string [] = patterns.filter((pattern) => !pattern.startsWith(NEGATED_PATTERN_MATCH));
  // First check if each non negated pattern produces any paths
  const sortedPaths:string[] = flatten(await pMap(positivePatterns, async (pattern:string):Promise<string[]> => {
    let newPaths:string[] = await globby(pattern, { cwd: projectRoot });

    if (newPaths.length === 0) {
      hasInvalidPatterns = true;
      printWarning(`👉 Pattern ${safe.bold(pattern)} didn't match any files.`);
    }

    // If there are multiple paths returned by globby, sort them
    if (newPaths.length > 1) {
      newPaths = sortFilePaths(newPaths);
    }

    return newPaths;
  }));

  // If some pattern doesn't provide some files, throw an error as this may result to broken library to be pushed
  // (e.g. when some files won't be commited to the repository)
  if (hasInvalidPatterns) {
    throw new Error(`🚫 Please check your config file and fix wrong patterns.`);
  }

  // Finally get paths for all patterns, as this may produce different results than
  // checking each pattern separately (some patterns may be excluded)
  const allPaths:string[] = await globby(patterns, { cwd: projectRoot });

  return intersection(sortedPaths, allPaths);
}
