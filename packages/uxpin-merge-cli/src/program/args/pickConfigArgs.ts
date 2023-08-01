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
  const configFlags: Array<keyof ConfigEnabledProgramArgs> = [
    'pageHeadContent',
    'webpackConfig',
    'uxpinDomain',
    'wrapper',
  ];

  const config = pickNonEmptyValues<ConfigEnabledProgramArgs>(components, configFlags);
  return normalizeConfig(config);
}

function pickNonEmptyValues<T>(input: T, keys: Array<keyof T>) {
  const result = {} as T;
  keys.forEach((key) => {
    const value = input[key];
    if (value) {
      result[key] = value;
    }
  });
  return result;
}

function normalizeConfig(config: ConfigEnabledProgramArgs) {
  return {
    ...config,
    pageHeadContent: makeArray(config.pageHeadContent),
  };
}

function makeArray(input: string | string[] | undefined) {
  if (!input) return [];
  return Array.isArray(input) ? (input as string[]) : [input];
}
