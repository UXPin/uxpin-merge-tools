import { getNgrokSessionId } from '../../../common/services/ngrok/getNgrokSessionId';
import { ExperimentationState } from '../../../program/command/experimentation/getExperimentationCommandSteps';
import { StepExecutor } from '../../../program/command/Step';
import { DSMetadata } from '../../../program/DSMeta';
import { Store } from '../../../program/utils/store/Store';
import { isFile } from '../../../utils/fs/isFile';
import { BuildOptions } from '../../building/BuildOptions';
import { createEPID } from './createEPID';
import { getEPIDFilePath } from './getEPIDFilePath';
import { updateEPID } from './updateEPID';

export function thunkCreateEPID(buildOptions:BuildOptions, store:Store<ExperimentationState>):StepExecutor {
  return async (ds:DSMetadata) => {
    const { projectRoot } = buildOptions;
    const epidFilePath:string = getEPIDFilePath(projectRoot);
    const epidExists:boolean = await isFile(epidFilePath);

    if (epidExists) {
      await updateEPID(epidFilePath, {
        ngrokSessionId: getNgrokSessionId(store.state.ngrokUrl!),
      });
    } else {
      await createEPID(epidFilePath, {
        ngrokSessionId: getNgrokSessionId(store.state.ngrokUrl!),
      });
    }

    return ds;
  };
}
