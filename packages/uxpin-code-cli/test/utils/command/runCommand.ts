import { exec } from 'child-process-promise';

export function runCommand(command:string):Promise<string> {
  return exec(command).then((result) => {
  	return result.stdout;
  });
}
