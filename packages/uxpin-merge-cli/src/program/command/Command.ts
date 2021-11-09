export enum Command {
  DUMP = 'dump',
  EXPERIMENT = 'experiment',
  INIT = 'init',
  CREATE_APP = 'create-app',
  GENERATE_PRESETS = 'generate-presets',
  PUSH = 'push',
  SERVER = 'server',
  SUMMARY = 'summary',
}

export const DEFAULT_COMMAND:Command = Command.EXPERIMENT;
