import { resolve } from 'path';
import { getApiDomain } from '../../../../common/services/UXPin/getApiDomain';
import { getLatestCommitHash } from '../../../../common/services/UXPin/getLatestCommitHash';
import { postPushMetadata } from '../../../../common/services/UXPin/postPushMetadata';
import { postUploadBundle } from '../../../../common/services/UXPin/postUploadBundle';
import { DSMetadata } from '../../../../program/DSMeta';
import { BuildOptions } from '../../../../steps/building/BuildOptions';
import { LIBRARY_OUTPUT_FILENAME } from '../../../../steps/building/config/getConfig';
import { VCSDetails } from '../../../../steps/serialization/DesignSystemSnapshot';
import { isSameVersion } from '../../../../steps/serialization/vcs/isSameVersion';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { StepExecutor } from '../../Step';

export function uploadLibrary(buildOptions:BuildOptions):StepExecutor {
  return async (designSystem:DSMetadata) => {
    if (isSameVersion(designSystem.result)) {
      printLine('✅ Library is up-to-date!', { color: PrintColor.GREEN });

      return designSystem;
    }

    const apiDomain:string = getApiDomain(buildOptions.uxpinApiDomain!);
    const token:string = buildOptions.token!;
    const vcsDetails:VCSDetails = designSystem.result.vcs;
    const commitHash:string = vcsDetails.commitHash;
    const path:string = resolve(buildOptions.uxpinDirPath, LIBRARY_OUTPUT_FILENAME);

    const latestCommitHash:string|null = await getLatestCommitHash(apiDomain, vcsDetails.branchName, token);
    const diffSourceCommitHash:string|null = vcsDetails.movedObjects && vcsDetails.movedObjects.diffSourceCommitHash
      ? vcsDetails.movedObjects.diffSourceCommitHash
      : null;

    if (diffSourceCommitHash && diffSourceCommitHash !== latestCommitHash) {
      throw new Error('🛑 There was new version deployed during your build. Please try again.');
    }

    try {
      await postUploadBundle(apiDomain, token, commitHash, path);
      printLine('✅ Library bundle uploaded successfully!', { color: PrintColor.GREEN });
    } catch (error) {
      printLine('🛑 There was an error while uploading library bundle! Please try again.', { color: PrintColor.RED });
      throw new Error(error.message);
    }

    try {
      await postPushMetadata(apiDomain, token, designSystem);
      printLine('✅ Library metadata uploaded successfully!', { color: PrintColor.GREEN });
    } catch (error) {
      printLine('🛑 There was an error while uploading library metadata! Please try again.', { color: PrintColor.RED });
      throw new Error(error.message);
    }

    return designSystem;
  };
}
