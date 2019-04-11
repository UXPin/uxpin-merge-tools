import { ExperimentationServerOptions } from '../server/startExperimentationServer';

export function getAPPExperimentationRemoteURL(options:ExperimentationServerOptions):string {
  const { epid, ngrokSessionId, port, uxpinDomain } = options;
  const url:string = `https://app.${uxpinDomain}/experiment/${epid.revisionId}`;

  if (ngrokSessionId) {
    return `${url}?ngrok_session=${ngrokSessionId}`;
  }

  return `${url}?port=${port}`;
}
