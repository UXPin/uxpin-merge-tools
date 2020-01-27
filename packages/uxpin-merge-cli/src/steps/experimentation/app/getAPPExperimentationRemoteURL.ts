import { ExperimentationServerOptions } from '../server/startExperimentationServer';

export function getAPPExperimentationRemoteURL(options:ExperimentationServerOptions):string {
  const { epid, ngrokSessionId, port, uxpinDomain, projectName } = options;
  const url:string = `https://app.${uxpinDomain}/experiment/${epid.revisionId}`;
  const projectNameParam:string = `&name=${projectName}`;

  if (ngrokSessionId) {
    return `${url}?ngrok_session=${ngrokSessionId}${projectNameParam}`;
  }

  return `${url}?port=${port}${projectNameParam}`;
}
