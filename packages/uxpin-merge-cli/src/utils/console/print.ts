import { PrintColor, PrintOptions } from './PrintOptions';

export function print(
  message:string,
  {
    channel = 'stdout',
    underline = false,
    color,
  }:PrintOptions = {},
):void {
  let msg:string = message;
  if (underline) {
    msg = applyUnderline(message);
  }

  if (color) {
    msg = applyColor(msg, color);
  }

  process[channel].write(msg);
}

function applyUnderline(text:string):string {
  return `\x1b[4m${text}\x1b[0m`;
}

function applyColor(text:string, printColor:PrintColor):string {
  return `\x1b[${printColor}m${text}\x1b[0m`;
}
