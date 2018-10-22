import { CommanderStatic } from 'commander';

import { Arg, ProgramArgs, RawProgramArgs } from './ProgramArgs';

export const DEFAULT_CONFIG_PATH:string = './uxpin.config.js';
export const DEFAULT_COMMAND:Command = 'experiment';

const defaultArgs:{ [key in Command]:ProgramArgs } = {
  clean: {
    command: 'clean',
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
  },
  dump: {
    command: 'dump',
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
  },
  experiment: {
    command: 'experiment',
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
    port: 8877,
    uxpinDomain: 'uxpin.com',
  },
  push: {
    command: 'push',
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
  },
  server: {
    command: 'server',
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
    port: 8080,
  },
  summary: {
    command: 'summary',
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
  },
};

export function getProgramArgs(program:RawProgramArgs):ProgramArgs {
  const command:Command = getCommand(program);
  return { ...defaultArgs[command], ...program, ...getCommandArgs(program, command) } as ProgramArgs;
}

function getCommand(program:RawProgramArgs):Command {
  const args:Arg[] = program.args || [];
  return args.filter(isArgKnownCommand(Object.keys(defaultArgs)))
    .reduce<Command>((command, arg) => arg.name() as Command, DEFAULT_COMMAND);
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

type Command = 'clean' | 'dump' | 'push' | 'server' | 'summary' | 'experiment';
