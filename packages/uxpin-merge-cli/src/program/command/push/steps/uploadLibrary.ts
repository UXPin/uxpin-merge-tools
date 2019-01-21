import { resolve } from 'path';
import { DSMetadata } from '../../../../program/DSMeta';
import { getApiDomain } from '../../../../services/UXPin/getApiDomain';
import { postPushMetadata } from '../../../../services/UXPin/postPushMetadata';
import { postUploadBundle } from '../../../../services/UXPin/postUploadBundle';
import { BuildOptions } from '../../../../steps/building/BuildOptions';
import { LIBRARY_OUTPUT_FILENAME } from '../../../../steps/building/config/getConfig';
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
    const commitHash:string = designSystem.result.vcs.commitHash;
    const path:string = resolve(buildOptions.uxpinDirPath, LIBRARY_OUTPUT_FILENAME);

    try {
      await postUploadBundle(apiDomain, buildOptions.token!, commitHash, path);
      printLine('✅ Library bundle uploaded successfully!', { color: PrintColor.GREEN });
    } catch (error) {
      printLine('🛑 There was an error while uploading library bundle!', { color: PrintColor.RED });
      return Promise.reject(error);
    }

    try {
      await postPushMetadata(apiDomain, buildOptions.token!, designSystem);
      printLine('✅ Library metadata uploaded successfully!', { color: PrintColor.GREEN });
    } catch (error) {
      return Promise.reject(error);
    }

    return designSystem;
  };
}
