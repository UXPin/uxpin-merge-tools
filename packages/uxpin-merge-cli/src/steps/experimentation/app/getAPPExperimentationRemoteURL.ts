import { ExperimentationServerOptions } from '../server/startExperimentationServer';

export function getAPPExperimentationRemoteURL(options:ExperimentationServerOptions):string {
  const { epid, ngrokSessionId, uxpinDomain } = options;
  return `https://app.${uxpinDomain}/experiment/${epid.revisionId}?ngrok_session=${ngrokSessionId}`;
}
