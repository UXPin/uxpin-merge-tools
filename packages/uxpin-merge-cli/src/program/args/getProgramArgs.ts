import { CommanderStatic } from 'commander';
import { Command, DEFAULT_COMMAND } from '../command/Command';
import { Arg, ProgramArgs, RawProgramArgs } from './ProgramArgs';

export const DEFAULT_CONFIG_PATH:string = './uxpin.config.js';

const defaultArgs:{ [key in Command]:ProgramArgs } = {
  [Command.DUMP]: {
    command: Command.DUMP,
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
  },
  [Command.EXPERIMENT]: {
    command: Command.EXPERIMENT,
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
    port: 8877,
    skipBrowser: false,
    uxpinDomain: 'uxpin.com',
  },
  [Command.PUSH]: {
    command: Command.PUSH,
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
  },
  [Command.SERVER]: {
    command: Command.SERVER,
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
    port: 8080,
  },
  [Command.SUMMARY]: {
    command: Command.SUMMARY,
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
