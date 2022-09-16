import { CommanderStatic } from 'commander';
import { Command, DEFAULT_COMMAND } from '../command/Command';
import { pickConfigArgs } from './pickConfigArgs';
import { Arg, ConfigEnabledProgramArgs, ProgramArgs, RawProgramArgs } from './ProgramArgs';
import { getConfigPath } from './providers/paths/getConfigPath';

export const DEFAULT_CONFIG_PATH = './uxpin.config.js';
const DEFAULT_UXPIN_DOMAIN = 'uxpin.com';

const defaultArgs: { [key in Command]: ProgramArgs } = {
  [Command.GENERATE_PRESETS]: {
    command: Command.GENERATE_PRESETS,
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
  },
  [Command.DUMP]: {
    command: Command.DUMP,
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
  },
  [Command.EXPERIMENT]: {
    command: Command.EXPERIMENT,
    config: DEFAULT_CONFIG_PATH,
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
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
    token: process.env.UXPIN_AUTH_TOKEN,
    uxpinDomain: DEFAULT_UXPIN_DOMAIN,
  },
  [Command.DELETE_VERSION]: {
    command: Command.DELETE_VERSION,
    config: DEFAULT_CONFIG_PATH,
    cwd: process.cwd(),
    token: process.env.UXPIN_AUTH_TOKEN,
    uxpinDomain: DEFAULT_UXPIN_DOMAIN,
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

export function getProgramArgs(program: RawProgramArgs): ProgramArgs {
  const command: Command = getCommand(program);
  const cliArgs: ProgramArgs = getCLIArgs(program, command);
  const configArgs: ConfigEnabledProgramArgs = pickConfigArgs(
    getConfigPath({ ...defaultArgs[command], ...cliArgs }),
    command
  );
  return {
    ...defaultArgs[command],
    ...configArgs,
    ...cliArgs,
  } as ProgramArgs;
}

function getCommand(program: RawProgramArgs): Command {
  const args: Arg[] = program.args || [];
  return args
    .filter(isArgKnownCommand(Object.keys(defaultArgs)))
    .reduce<Command>((command, arg) => arg.name() as Command, DEFAULT_COMMAND);
}

function getCLIArgs(program: RawProgramArgs, command: Command): ProgramArgs {
  return {
    ...program,
    ...getCommandArgs(program, command),
  } as ProgramArgs;
}

function getCommandArgs(program: RawProgramArgs, command: Command): ProgramArgs | {} {
  const commanderStatic: CommanderStatic = (program.args || []).find(isArgKnownCommand([command])) as CommanderStatic;
  if (!commanderStatic) {
    return {};
  }

  return { ...(commanderStatic as any) } as RawProgramArgs;
}

function isArgKnownCommand(knownCommands: string[]): (arg: Arg) => arg is CommanderStatic {
  return (arg: Arg): arg is CommanderStatic => typeof arg !== 'string' && knownCommands.includes(arg.name());
}
