import { ExperimentationServerOptions } from '../server/startExperimentationServer';

export function getAPPExperimentationRemoteURL(options:ExperimentationServerOptions):string {
  const { epid, port, uxpinDomain } = options;
  return `https://app.${uxpinDomain}/experiment/${epid.revisionId}?port=${port}`;
}
