import { CommanderStatic } from 'commander';
import { Command, DEFAULT_COMMAND } from '../command/Command';
import { pickConfigArgs } from './pickConfigArgs';
import { Arg, ConfigEnabledProgramArgs, ProgramArgs, RawProgramArgs } from './ProgramArgs';
import { getConfigPath } from './providers/paths/getConfigPath';

import { DEFAULT_CONFIG_PATH, DEFAULT_UXPIN_DOMAIN, STORYBOOK_UXPIN_CONFIG_PATH } from '../../common/constants';

function getDefaultArgs(program:RawProgramArgs):{ [key in Command]:ProgramArgs } {
  const defaultConfigPath:string = program.storybook ? STORYBOOK_UXPIN_CONFIG_PATH : DEFAULT_CONFIG_PATH;

  return {
    [Command.GENERATE_PRESETS]: {
      command: Command.GENERATE_PRESETS,
      config: DEFAULT_CONFIG_PATH,
      cwd: process.cwd(),
    },
    [Command.DUMP]: {
      command: Command.DUMP,
      config: defaultConfigPath,
      cwd: process.cwd(),
    },
    [Command.EXPERIMENT]: {
      command: Command.EXPERIMENT,
      config: defaultConfigPath,
      cwd: process.cwd(),
      disableTunneling: false,
      port: 8877,
      skipBrowser: false,
      uxpinDomain: DEFAULT_UXPIN_DOMAIN,
    },
    [Command.INIT]: {
      command: Command.INIT,
      config: DEFAULT_CONFIG_PATH,
      cwd: process.cwd(),
    },
    [Command.PUSH]: {
      command: Command.PUSH,
      config: defaultConfigPath,
      cwd: process.cwd(),
      token: process.env.UXPIN_AUTH_TOKEN,
      uxpinDomain: DEFAULT_UXPIN_DOMAIN,
    },
    [Command.SERVER]: {
      command: Command.SERVER,
      config: defaultConfigPath,
      cwd: process.cwd(),
      port: 8080,
    },
    [Command.SUMMARY]: {
      command: Command.SUMMARY,
      config: defaultConfigPath,
      cwd: process.cwd(),
    },
  };
}

export function getProgramArgs(program:RawProgramArgs):ProgramArgs {
  const command:Command = getCommand(program);
  const cliArgs:ProgramArgs = getCLIArgs(program, command);
  const configPath:string = getConfigPath({ ...getDefaultArgs(program)[command], ...cliArgs });
  const configArgs:ConfigEnabledProgramArgs = pickConfigArgs(configPath, command);
  return {
    ...getDefaultArgs(program)[command],
    ...configArgs,
    ...cliArgs,
  } as ProgramArgs;
}

function getCommand(program:RawProgramArgs):Command {
  const args:Arg[] = program.args || [];
  return args.filter(isArgKnownCommand(Object.keys(getDefaultArgs(program))))
    .reduce<Command>((command, arg) => arg.name() as Command, DEFAULT_COMMAND);
}

function getCLIArgs(program:RawProgramArgs, command:Command):ProgramArgs {
  return {
    ...program,
    ...getCommandArgs(program, command),
  } as ProgramArgs;
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
