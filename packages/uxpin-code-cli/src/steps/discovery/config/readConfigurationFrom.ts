import { join } from 'path';
import { CliConfig } from './CliConfig';

const CONFIG_FILE_NAME:string = 'uxpin.config.js';

export function readConfigurationFrom(directoryPath:string):CliConfig | undefined {
  try {
    return require(join(directoryPath, CONFIG_FILE_NAME));
  } catch (e) {
    console.log('Error while reading configuration file. Using default configuration');
    console.log(e);
    return;
  }
}
