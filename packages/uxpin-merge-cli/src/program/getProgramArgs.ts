import { CommanderStatic } from 'commander';

import { Arg, ProgramArgs, RawProgramArgs } from './ProgramArgs';

export const DEFAULT_CONFIG_PATH:string = './uxpin.config.js';
export const DEFAULT_COMMAND:Command = 'experiment';

const defaultArgs:{ [key in Command]:ProgramArgs } = {
  experiment: {
    command: 'experiment',
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
    port: 8877,
  },
  push: {
    command: 'push',
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
    dump: false,
    summary: false,
  },
  server: {
    command: 'server',
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
    port: 8080,
  },
};

export function getProgramArgs(program:RawProgramArgs):ProgramArgs {
  const command:Command = getCommand(program);
  return { ...defaultArgs[command], ...program, ...getCommandArgs(program, command) } as ProgramArgs;
}

function getCommand(program:RawProgramArgs):Command {
  const args:Arg[] = program.args || [];
  return args.filter(isArgKnownCommand(Object.keys(defaultArgs)))
    .reduce((command, arg) => arg.name(), DEFAULT_COMMAND) as Command;
}

function getCommandArgs(program:RawProgramArgs, command:Command):ProgramArgs | {} {
  const commanderStatic:CommanderStatic = (program.args || [])
    .find(isArgKnownCommand([command])) as CommanderStatic;

  if (!commanderStatic) {
    return {};
  }

  return { ...commanderStatic as any } as RawProgramArgs;
}

function isArgKnownCommand(knownCommands:string[]):(arg:Arg) => arg is CommanderStatic {
  return (arg:Arg):arg is CommanderStatic => typeof arg !== 'string' && knownCommands.includes(arg.name());
}

type Command = 'push' | 'server' | 'experiment';
