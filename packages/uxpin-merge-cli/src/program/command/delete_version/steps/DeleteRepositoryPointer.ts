import { PrintColor } from '../../../../../src/utils/console/PrintOptions';
import { deleteRepositoryPointerToBranch } from '../../../../common/services/UXPin/DeleteRepositoryPointerToBranch';
import { deleteTag } from '../../../../common/services/UXPin/DeleteTag';
import { getApiDomain } from '../../../../common/services/UXPin/getApiDomain';
import { DSMetadata } from '../../../../program/DSMeta';
import { DeleteOptions } from '../../../../steps/deleting/DeleteOptions';
import { VCSDetails } from '../../../../steps/serialization/DesignSystemSnapshot';
import { printError, printLine } from '../../../../utils/console/printLine';
import { StepExecutor } from '../../Step';
import { isDefaultBranch } from '../../../../utils/isDefaultBranch';

export function deleteRepositoryPointer(deleteOptions: DeleteOptions): StepExecutor {
  return async (designSystem: DSMetadata) => {
    const apiDomain: string = getApiDomain(deleteOptions.uxpinApiDomain!);
    const authToken: string = deleteOptions.token!;
    const vcsDetails: VCSDetails = designSystem.result.vcs;
    const branch: string | undefined =
      vcsDetails && !isDefaultBranch(vcsDetails.branchName) ? vcsDetails.branchName : undefined;
    const tag: string | undefined = deleteOptions.tag;

    if (tag && branch) {
      printError(`🛑 Please specify --branch or --tag. Only one option is required.`);
      return designSystem;
    }

    if (!tag && !branch) {
      printError(`🛑 Please specify --branch or --tag and the name of the version you would like to delete.`);
      return designSystem;
    }

    if (tag) {
      await deleteTagWithPrintMessage({
        apiDomain,
        authToken,
        tag,
      });
      return designSystem;
    }

    if (branch) {
      await deleteRepositoryPointerWithPrintMessage({
        apiDomain,
        authToken,
        branch,
      });
      return designSystem;
    }

    return designSystem;
  };
}

async function deleteTagWithPrintMessage(opts: { apiDomain: string; authToken: string; tag: string }): Promise<void> {
  try {
    await deleteTag(opts);
    printLine(`🏷️  Library tag version [${opts.tag}] has been deleted.`, { color: PrintColor.YELLOW });
  } catch (error) {
    printLine(`🛑 There was an error while deleting tag [${opts.tag}]`, {
      color: PrintColor.RED,
    });
    throw new Error((error as Error).message);
  }
}

async function deleteRepositoryPointerWithPrintMessage(opts: {
  apiDomain: string;
  authToken: string;
  branch: string;
}): Promise<void> {
  try {
    await deleteRepositoryPointerToBranch(opts);
    printLine(`Library branch version [${opts.branch}] has been deleted.`, { color: PrintColor.YELLOW });
  } catch (error) {
    printLine(`🛑 There was an error while deleting branch [${opts.branch}]`, { color: PrintColor.RED });
    throw new Error((error as Error).message);
  }
}
