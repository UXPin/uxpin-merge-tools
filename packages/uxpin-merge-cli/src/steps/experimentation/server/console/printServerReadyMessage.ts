import { getUXPinMergeBanner } from '../../../../utils/banner/getUXPinMergeBanner';
import { printLine } from '../../../../utils/console/printLine';

const experimentalMode:string = 'Experimental Mode';
const SEPARATOR:string = '-------------------';
export const SERVER_READY_OUTPUT:RegExp = new RegExp(SEPARATOR);

export async function printServerReadyMessage(experimentationUrl:string):Promise<void> {
  printLine(getUXPinMergeBanner(experimentalMode));
  printLine('👩‍🔬 Open the following URL in your browser to enter the experimental mode:');
  printLine(experimentationUrl, { underline: true });
  printLine('');
  printLine(SEPARATOR);
  printLine('');
}
