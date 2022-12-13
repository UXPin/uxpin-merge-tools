import { ExperimentationServerOptions } from '../server/startExperimentationServer';

export function getAPPExperimentationRemoteURL(options: ExperimentationServerOptions): string {
  const { epid, ngrokSessionId, port, uxpinDomain, projectName } = options;
  const url = `https://app.${uxpinDomain}/experiment/${epid.revisionId}`;
  const projectNameParam = `&name=${projectName}`;

  if (ngrokSessionId) {
    return `${url}?ngrok_session=${ngrokSessionId}${projectNameParam}`;
  }

  return `${url}?port=${port}${projectNameParam}`;
}
