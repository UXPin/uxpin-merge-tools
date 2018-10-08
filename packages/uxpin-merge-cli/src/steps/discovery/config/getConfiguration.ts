import { CliConfig } from './CliConfig';
import { getDefaultConfiguration } from './getDefaultConfiguration';
import { readConfigurationFrom } from './readConfigurationFrom';

export function getConfiguration(configPath:string):CliConfig {
  return readConfigurationFrom(configPath) || getDefaultConfiguration();
}
