import * as safe from 'colors/safe';
import { DSMetadata } from '../../../../program/DSMeta';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';

const BRANCH_MASTER:string = 'master';

export async function printBranchWarning(designSystem:DSMetadata):Promise<DSMetadata> {
  if (designSystem.result.vcs.branchName === BRANCH_MASTER) {
    return designSystem;
  }

  printLine(
    `⚠️ Libraries pushed from branch different than ${safe.bold(BRANCH_MASTER)} are currently not supported by UXPin Editor!`, // tslint:disable:max-line-length
    { color: PrintColor.YELLOW },
  );

  return designSystem;
}
