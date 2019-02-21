import { print } from './print';
import { PrintColor, PrintOptions } from './PrintOptions';

export function printLine(message:string, options:PrintOptions = {}):void {
  print(`${message}\n`, options);
}

export function printError(message:string):void {
  printLine(message, { color: PrintColor.RED });
}

export function printWarning(message:string):void {
  printLine(message, { color: PrintColor.YELLOW });
}
