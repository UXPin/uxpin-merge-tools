import { getConfiguration } from '../../steps/discovery/config/getConfiguration';
import { ConfigEnabledProgramArgs } from './ProgramArgs';

export function pickConfigArgs(configPath:string):ConfigEnabledProgramArgs {
  const { components } = getConfiguration(configPath);
  const configFlags:Array<keyof ConfigEnabledProgramArgs> = ['webpackConfig', 'uxpinDomain', 'wrapper'];

  return configFlags.reduce<ConfigEnabledProgramArgs>((result, flag) => {
    if (components[flag]) {
      result[flag] = components[flag];
    }
    return result;
  }, {});
}
