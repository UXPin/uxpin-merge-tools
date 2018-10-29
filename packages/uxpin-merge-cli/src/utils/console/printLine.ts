import { print } from './print';
import { PrintOptions } from './PrintOptions';

export function printLine(message:string, options:PrintOptions = {}):void {
  print(`${message}\n`, options);
}
