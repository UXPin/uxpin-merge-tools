import { join } from 'path';
import { BuildOptions } from '../../../steps/building/BuildOptions';
import { TEMP_DIR_PATH } from '../../../steps/building/config/getConfig';
import { startExperimentationServer } from '../../../steps/experimentation/server/startExperimentationServer';
import { DSMetadata } from '../../DSMeta';
import { ExperimentProgramArgs } from '../../ProgramArgs';
import { getBuildOptions } from '../push/getBuildOptions';
import { Step } from '../Step';

export function getExperimentationServerCommandSteps(args:ExperimentProgramArgs):Step[] {
  return [
    { exec: thunkStartExperimentationServer(getBuildOptions(args), args.port), shouldRun: true },
  ];
}

function thunkStartExperimentationServer(buildOptions:BuildOptions, port:number):(ds:DSMetadata) => Promise<any> {
  return () => {
    return startExperimentationServer({
      port,
      uxpinDirPath: join(buildOptions.projectRoot, TEMP_DIR_PATH),
    });
  };
}
