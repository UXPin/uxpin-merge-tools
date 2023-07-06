import { resolve } from 'path';
import { ALTERNATIVE_DEFAULT_BRANCH_NAME, DEFAULT_BRANCH_NAME } from '../../../../common/constants';
import { createTag } from '../../../../common/services/UXPin/createTag';
import { getApiDomain } from '../../../../common/services/UXPin/getApiDomain';
import { getLatestCommitHash } from '../../../../common/services/UXPin/getLatestCommitHash';
import { postPushMetadata } from '../../../../common/services/UXPin/postPushMetadata';
import { postUploadBundle } from '../../../../common/services/UXPin/postUploadBundle';
import { updateRepositoryPointerToBranch } from '../../../../common/services/UXPin/updateRepositoryPointerToBranch';
import { DSMetadata } from '../../../../program/DSMeta';
import { BuildOptions } from '../../../../steps/building/BuildOptions';
import { LIBRARY_OUTPUT_FILENAME } from '../../../../steps/building/config/getConfig';
import { VCSDetails } from '../../../../steps/serialization/DesignSystemSnapshot';
import { isSameVersion } from '../../../../steps/serialization/vcs/isSameVersion';
import { getBranchesAtCommit } from '../../../../steps/serialization/vcs/repositories/git/util/getBranchesAtCommit';
import { printError, printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { StepExecutor } from '../../Step';
import { isDefaultBranch } from '../../../../utils/isDefaultBranch';

export function uploadLibrary(buildOptions: BuildOptions): StepExecutor {
  return async (designSystem: DSMetadata) => {
    const apiDomain: string = getApiDomain(buildOptions.uxpinApiDomain!);
    const authToken: string = buildOptions.token!;
    const vcsDetails: VCSDetails = designSystem.result.vcs;
    const commitHash: string = vcsDetails.commitHash;
    const path: string = resolve(buildOptions.uxpinDirPath, LIBRARY_OUTPUT_FILENAME);
    const branch: string = vcsDetails && vcsDetails.branchName ? vcsDetails.branchName : DEFAULT_BRANCH_NAME;
    const tag: string | undefined = buildOptions.tag;

    // Get the latest commit hash known by the backend
    // NOTE: if the branch has changed locally, but latest commit has not (so a fresh branch)
    // then this will be the same as the current commit hash
    const latestCommitHash: string | null = buildOptions.force
      ? null
      : await getLatestCommitHash(apiDomain, vcsDetails.branchName, authToken);

    // Ensure vcsDetails.paths && branch were provided
    if (!vcsDetails.paths || !branch) {
      printError('🛑 Internal Error: VCS Details incomplete');
      return designSystem;
    }

    // Get the branches at the current commit
    const branchesAtCurrentCommit: string[] = await getBranchesAtCommit(vcsDetails.paths.projectRoot, commitHash);

    // Prevent trying to push non-master commits to master or main
    if (!branchesAtCurrentCommit.includes(branch)) {
      if (isDefaultBranch(branch) && !branchesAtCurrentCommit.includes(ALTERNATIVE_DEFAULT_BRANCH_NAME)) {
        printError(
          `🛑 The current commit is not on branch [${branch}], please specify --branch to use a custom branch`
        );
        return designSystem;
      }
    }

    // If the backend already has the commit we're trying to push,
    // Update the repository pointer to the current branch and exit early
    if (isSameVersion(designSystem.result)) {
      printLine('✅ Library is up-to-date!', { color: PrintColor.GREEN });
      // Update the repository pointer to point to the new branch
      await updateRepositoryPointerWithPrintMessage({
        apiDomain,
        authToken,
        branch,
        commitHash,
      });

      if (tag) {
        await createTagWithPrintMessage({
          apiDomain,
          authToken,
          commitHash,
          tag,
        });
      }

      return designSystem;
    }

    let diffSourceCommitHash: string | null = null;
    if (vcsDetails.movedObjects && vcsDetails.movedObjects.diffSourceCommitHash) {
      diffSourceCommitHash = vcsDetails.movedObjects.diffSourceCommitHash;
    }

    if (diffSourceCommitHash && diffSourceCommitHash !== latestCommitHash) {
      throw new Error('🛑 There was new version deployed during your build. Please try again.');
    }

    try {
      await postUploadBundle(apiDomain, authToken, commitHash, path);
      printLine('✅ Library bundle uploaded successfully!', { color: PrintColor.GREEN });
    } catch (error) {
      printLine('🛑 There was an error while uploading library bundle! Please try again.', { color: PrintColor.RED });
      throw new Error((error as Error).message);
    }

    try {
      await postPushMetadata(apiDomain, authToken, designSystem);
      printLine('✅ Library metadata uploaded successfully!', { color: PrintColor.GREEN });
    } catch (error) {
      printLine('🛑 There was an error while uploading library metadata! Please try again.', { color: PrintColor.RED });
      throw new Error((error as Error).message);
    }

    await updateRepositoryPointerWithPrintMessage({
      apiDomain,
      authToken,
      branch,
      commitHash,
    });

    if (tag) {
      await createTagWithPrintMessage({
        apiDomain,
        authToken,
        commitHash,
        tag,
      });
    }

    return designSystem;
  };
}

async function createTagWithPrintMessage(opts: {
  apiDomain: string;
  authToken: string;
  commitHash: string;
  tag: string;
}): Promise<void> {
  try {
    await createTag(opts);
    printLine(`🏷️  Library tagged at this point in time with tag [${opts.tag}] at commit hash [${opts.commitHash}]`, {
      color: PrintColor.YELLOW,
    });
  } catch (error) {
    printLine(`🛑 There was an error while creating a tag [${opts.tag}] at commit hash [${opts.commitHash}]`, {
      color: PrintColor.RED,
    });
    throw new Error((error as Error).message);
  }
}

async function updateRepositoryPointerWithPrintMessage(opts: {
  apiDomain: string;
  authToken: string;
  branch: string;
  commitHash: string;
}): Promise<void> {
  try {
    // Update the repository pointer to point to the new branch
    await updateRepositoryPointerToBranch(opts);

    printLine(`√ Projects using this Design System have been updated to branch [${opts.branch}]`, {
      color: PrintColor.CYAN,
    });
  } catch (error) {
    printLine(`🛑 There was an error while updating design system pointers [${opts.branch}]`, {
      color: PrintColor.RED,
    });
    throw new Error((error as Error).message);
  }
}
