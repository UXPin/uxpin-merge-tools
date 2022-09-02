export enum Command {
  DUMP = 'dump',
  EXPERIMENT = 'experiment',
  INIT = 'init',
  GENERATE_PRESETS = 'generate-presets',
  PUSH = 'push',
  DELETE_VERSION = 'delete-version',
  SERVER = 'server',
  SUMMARY = 'summary',
}

export const DEFAULT_COMMAND: Command = Command.EXPERIMENT;
