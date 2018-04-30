import { CliConfig } from './CliConfig';

export function readConfigurationFrom(configPath:string):CliConfig | undefined {
  try {
    return require(configPath);
  } catch (e) {
    console.log('Error while reading configuration file. Using default configuration');
    console.log(e);
    return;
  }
}
