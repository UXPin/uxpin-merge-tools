import { resolve } from 'path';
import { DSMetadata } from '../../../../program/DSMeta';
import { getApiDomain } from '../../../../services/UXPin/getApiDomain';
import { postUploadBundle } from '../../../../services/UXPin/postUploadBundle';
import { BuildOptions } from '../../../../steps/building/BuildOptions';
import { LIBRARY_OUTPUT_FILENAME } from '../../../../steps/building/config/getConfig';
import { StepExecutor } from '../../Step';

export function uploadBundle(options:BuildOptions):StepExecutor {
  return async (designSystem:DSMetadata) => {
    const commitHash:string = designSystem.result.vcs.commitHash;
    const path:string = resolve(options.uxpinDirPath, LIBRARY_OUTPUT_FILENAME);

    await postUploadBundle(getApiDomain(options.uxpinDomain!), options.token!, commitHash, path);

    return designSystem;
  };
}
