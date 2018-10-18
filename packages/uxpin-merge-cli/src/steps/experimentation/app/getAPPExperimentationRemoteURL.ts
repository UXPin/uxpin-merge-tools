import { EPID } from '../epid/EPID';
import { getProjectEPID } from '../epid/getProjectEPID';
import { ExperimentationServerOptions } from '../server/startExperimentationServer';

export async function getAPPExperimentationRemoteURL(options:ExperimentationServerOptions):Promise<string> {
  const epid:EPID = await getProjectEPID(options.projectRoot);
  return `https://app.${options.uxpinDomain}/experiment/${epid.revisionId}?port=${options.port}`;
}
