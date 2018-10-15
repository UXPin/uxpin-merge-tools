import { startDebugServer } from '../../../debug/server/startDebugServer';
import { BuildOptions } from '../../../steps/building/BuildOptions';
import { getAllComponentsFromCategories } from '../../../steps/serialization/component/categories/getAllComponentsFromCategories';
import { ServerProgramArgs } from '../../args/ProgramArgs';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';
import { DSMetadata } from '../../DSMeta';
import { thunkBuildComponentsLibrary } from '../../utils/thunkBuildComponentsLibrary';
import { getBuildOptions } from '../push/getBuildOptions';
import { Step } from '../Step';

export function getServerCommandSteps(args:ServerProgramArgs):Step[] {
  const buildOptions:BuildOptions = getBuildOptions(args);
  return [
    { exec: thunkBuildComponentsLibrary(buildOptions), shouldRun: true },
    { exec: thunkStartServer(args), shouldRun: true },
  ];
}

function thunkStartServer(args:ServerProgramArgs):(ds:DSMetadata) => Promise<any> {
  return ({ result: { categorizedComponents } }) => {
    const { port } = args;
    return startDebugServer(getAllComponentsFromCategories(categorizedComponents), {
      port,
      root: getTempDirPath(args),
    });
  };
}
