import { CliConfig, ComponentSerializer } from './CliConfig';

export function getSerializationPlugin(config:CliConfig):ComponentSerializer | undefined {
  return config.components.plugins && config.components.plugins.serialization;
}
