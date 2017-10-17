import { CommanderStatic } from 'commander';

import { ProgramArgs, RawProgramArgs } from './ProgramArgs';

const defaultArgs:{[key in Command]:ProgramArgs} = {
  server: {
    command: 'server',
    cwd: process.cwd(),
  },
  upload: {
    command: 'upload',
    cwd: process.cwd(),
    dump: false,
    summary: false,
  },
};

export function getProgramArgs(program:RawProgramArgs):ProgramArgs {
  const command:Command = getCommand(program);
  return { ...defaultArgs[command], ...program } as ProgramArgs;
}

function getCommand(program:RawProgramArgs):Command {
  const { args } = program;
  return (args || [])
    .filter((arg) => typeof arg !== 'string' && Object.keys(defaultArgs).includes(arg.name()))
    .reduce((command, arg) => (arg as CommanderStatic).name(), 'upload') as Command;
}

type Command = 'upload'|'server';
