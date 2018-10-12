import { join } from 'path';
import { startServer } from '../../../debug/server/startServer';
import { BuildOptions } from '../../../steps/building/BuildOptions';
import { TEMP_DIR_PATH } from '../../../steps/building/config/getConfig';
import { getAllComponentsFromCategories } from '../../../steps/serialization/component/categories/getAllComponentsFromCategories';
import { DSMetadata } from '../../DSMeta';
import { ServerProgramArgs } from '../../ProgramArgs';
import { Step } from '../Step';
import { thunkBuildComponentsLibrary } from '../../utils/thunkBuildComponentsLibrary';

export function getServerCommandSteps(buildOptions:BuildOptions, args:ServerProgramArgs):Step[] {
  return [
    { exec: thunkBuildComponentsLibrary(buildOptions), shouldRun: true },
    { exec: thunkStartServer(buildOptions, args.port), shouldRun: true },
  ];
}

function thunkStartServer(buildOptions:BuildOptions, port:number):(ds:DSMetadata) => Promise<any> {
  return ({ result: { categorizedComponents } }) => startServer(getAllComponentsFromCategories(categorizedComponents), {
    port,
    root: join(buildOptions.projectRoot, TEMP_DIR_PATH),
  });
}
