import { getUXPinMergeBanner } from '../../../../utils/banner/getUXPinMergeBanner';
import { printLine } from '../../../../utils/console/printLine';
import { getAPPExperimentationRemoteURL } from '../../app/getAPPExperimentationRemoteURL';
import { ExperimentationServerOptions } from '../startExperimentationServer';

const experimentalMode:string = 'Experimental Mode';
export const SERVER_READY_OUTPUT:RegExp = new RegExp(experimentalMode);

export async function printServerReadyMessage(options:ExperimentationServerOptions):Promise<void> {
  printLine(getUXPinMergeBanner(experimentalMode));
  printLine('👩‍🔬 Open the following URL in your browser to enter the experimentation mode:');
  printLine(await getAPPExperimentationRemoteURL(options), { underline: true });
  printLine('');
}
