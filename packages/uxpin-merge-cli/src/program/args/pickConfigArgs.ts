import { Command } from '../..';
import { ComponentsConfig } from '../../steps/discovery/config/CliConfig';
import { getConfiguration } from '../../steps/discovery/config/getConfiguration';
import { getDefaultConfiguration } from '../../steps/discovery/config/getDefaultConfiguration';
import { ConfigEnabledProgramArgs } from './ProgramArgs';

export function pickConfigArgs(configPath: string, command: Command): ConfigEnabledProgramArgs {
  let components: ComponentsConfig;
  if (command === Command.INIT) {
    components = getDefaultConfiguration().components;
  } else {
    components = getConfiguration(configPath).components;
  }
  const configFlags: Array<keyof ConfigEnabledProgramArgs> = ['webpackConfig', 'uxpinDomain', 'wrapper'];

  return configFlags.reduce<ConfigEnabledProgramArgs>((result, flag) => {
    if (components[flag]) {
      result[flag] = components[flag];
    }
    return result;
  }, {});
}
