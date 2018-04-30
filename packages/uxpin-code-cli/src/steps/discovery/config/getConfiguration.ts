import { CliConfig } from './CliConfig';
import { getDefaultConfiguration } from './getDefaultConfiguration';
import { readConfigurationFrom } from './readConfigurationFrom';

export function getConfiguration(projectRoot:string):CliConfig {
  return readConfigurationFrom(projectRoot) || getDefaultConfiguration();
}
