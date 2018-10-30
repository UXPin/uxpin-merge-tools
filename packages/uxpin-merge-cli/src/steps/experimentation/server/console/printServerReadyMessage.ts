import { getUXPinMergeBanner } from '../../../../utils/banner/getUXPinMergeBanner';
import { printLine } from '../../../../utils/console/printLine';

const experimentalMode:string = 'Experimental Mode';
export const SERVER_READY_OUTPUT:RegExp = new RegExp(experimentalMode);

export async function printServerReadyMessage(experimentationUrl:string):Promise<void> {
  printLine(getUXPinMergeBanner(experimentalMode));
  printLine('👩‍🔬 Open the following URL in your browser to enter the experimentation mode:');
  printLine(experimentationUrl, { underline: true });
  printLine('');
}
