import { CommanderStatic } from 'commander';

import { ProgramArgs, RawProgramArgs } from './ProgramArgs';

const defaultArgs:{[key in Command]:ProgramArgs} = {
  server: {
    command: 'server',
    cwd: process.cwd(),
    port: 8080,
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
  return { ...defaultArgs[command], ...program, ...getCommandArgs(program, command) } as ProgramArgs;
}

function getCommand(program:RawProgramArgs):Command {
  return (program.args || [])
    .filter((arg) => typeof arg !== 'string' && Object.keys(defaultArgs).includes(arg.name()))
    .reduce((command, arg) => (arg as CommanderStatic).name(), 'upload') as Command;
}

function getCommandArgs(program:RawProgramArgs, command:Command):ProgramArgs | {} {
  const commanderStatic:CommanderStatic = (program.args || [])
    .find((arg) => typeof arg !== 'string' && arg.name() === command) as CommanderStatic;

  if (!commanderStatic) {
    return {};
  }

  return { ...commanderStatic as any } as RawProgramArgs;
}

type Command = 'upload'|'server';
