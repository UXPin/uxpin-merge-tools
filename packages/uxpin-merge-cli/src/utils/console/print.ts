import { PrintOptions } from './PrintOptions';

export function print(message:string, options:PrintOptions = {}):void {
  let msg:string = message;
  if (options.underline) {
    msg = underline(message);
  }

  process.stdout.write(msg);
}

function underline(text:string):string {
  return `\x1b[4m${text}\x1b[0m`;
}
