import { PrintColor, PrintOptions } from './PrintOptions';

export function print(message:string, options:PrintOptions = {}):void {
  let msg:string = message;
  if (options.underline) {
    msg = underline(message);
  }

  if (options.color) {
    msg = color(msg, options.color);
  }

  process.stdout.write(msg);
}

function underline(text:string):string {
  return `\x1b[4m${text}\x1b[0m`;
}

function color(text:string, printColor:PrintColor):string {
  return `\x1b[${printColor}m${text}\x1b[0m`;
}
