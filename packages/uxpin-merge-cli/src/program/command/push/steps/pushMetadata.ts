import { DSMetadata } from '../../../../program/DSMeta';
import { getApiDomain } from '../../../../services/UXPin/getApiDomain';
import { postPushMetadata } from '../../../../services/UXPin/postPushMetadata';
import { BuildOptions } from '../../../../steps/building/BuildOptions';
import { isSameVersion } from '../../../../steps/serialization/vcs/isSameVersion';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { StepExecutor } from '../../Step';

export function pushMetadata(buildOptions:BuildOptions):StepExecutor {
  return async (designSystem:DSMetadata) => {
    if (isSameVersion(designSystem.result)) {
      printLine('✅ Your library is up-to-date!', { color: PrintColor.GREEN });

      return designSystem;
    }

    try {
      await postPushMetadata(getApiDomain(buildOptions.uxpinDomain!), buildOptions.token!, designSystem);
    } catch (error) {
      return Promise.reject(error);
    }

    printLine('✅ Library metadata uploaded successfully!', { color: PrintColor.GREEN });

    return designSystem;
  };
}
