import * as path from 'path';
import { runCommand } from './runCommand';

export function runUxPinCodeCommand(options?:string):Promise<string> {
  const commandPath:string = path.join(__dirname, '../../bin/uxpin-code');
  return runCommand(`${commandPath} ${options}`);
}
