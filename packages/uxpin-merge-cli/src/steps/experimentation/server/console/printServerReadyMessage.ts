import { getUXPinMergeBanner } from '../../../../utils/banner/getUXPinMergeBanner';
import { getAPPExperimentationRemoteURL } from '../../app/getAPPExperimentationRemoteURL';
import { ExperimentationServerOptions } from '../startExperimentationServer';

const experimentalMode:string = 'Experimental Mode';
export const SERVER_READY_OUTPUT:RegExp = new RegExp(experimentalMode);

export async function printServerReadyMessage(options:ExperimentationServerOptions):Promise<void> {
  console.log(getUXPinMergeBanner(experimentalMode));
  console.log('👩‍🔬 Open the following URL in your browser to enter the experimentation mode:');
  console.log(underline(await getAPPExperimentationRemoteURL(options)));
}

function underline(text:string):string {
  return `\x1b[4m${text}\x1b[0m`;
}
