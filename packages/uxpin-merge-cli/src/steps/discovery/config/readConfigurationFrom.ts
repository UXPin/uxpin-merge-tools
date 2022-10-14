import { CliConfig } from './CliConfig';

export function readConfigurationFrom(configPath: string): CliConfig | undefined {
  try {
    return require(configPath);
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log(`'${configPath}' not found. Using default configuration.`);
      return;
    }
    console.log('Error while reading configuration file. Using default configuration');
    console.log(e);
  }
}
