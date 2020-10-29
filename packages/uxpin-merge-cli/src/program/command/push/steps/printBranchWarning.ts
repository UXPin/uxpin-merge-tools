import { HEAD_REF_NAME } from '../../../../common/constants';
import { DSMetadata } from '../../../../program/DSMeta';
import { isTestEnv } from '../../../../program/env/isTestEnv';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';

export async function printBranchWarning(designSystem:DSMetadata):Promise<DSMetadata> {
  const branch:string = designSystem.result.vcs.branchName;

  // Disallow uploading of branches that are empty (most commonly detached HEAD state)
  const isUnpushableBranch:boolean = !branch || branch === HEAD_REF_NAME;
  if (!isTestEnv() && isUnpushableBranch) {
    printLine(
      '🛑 Unable to determine current branch name (Design Systems may not be pushed from detached HEAD mode).',
      { color: PrintColor.RED },
    );
    console.info('Hint: please specify the --branch option if pushing from CI.');

    throw new Error(`Cannot push branch [${branch}]`);
  }

  return designSystem;
}
