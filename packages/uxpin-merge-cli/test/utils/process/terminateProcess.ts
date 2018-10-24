import terminate = require('terminate');
import { promisify } from 'util';

export function terminateProcess(pid:number):Promise<void> {
  return promisify(terminate)(pid);
}
