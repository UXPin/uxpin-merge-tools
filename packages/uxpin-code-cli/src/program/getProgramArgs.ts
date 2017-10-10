import { ProgramArgs } from './ProgramArgs';

const defaultArgs:ProgramArgs = {
  cwd: process.cwd(),
  dump: false,
  summary: false,
};

export function getProgramArgs(program:ProgramArgs):ProgramArgs {
  return { ...defaultArgs, ...program };
}
