import { LIBRARY_DEFAULT_NAME } from '../../experimentation/server/handler/libraries/GetLibrariesHandler';
import { CliConfig } from '../config/CliConfig';
import { getConfiguration } from '../config/getConfiguration';
import { ProjectPaths } from '../paths/ProjectPaths';

export function getLibrarySettings(projectPaths: ProjectPaths): string {
  const config: CliConfig = getConfiguration(projectPaths.configPath);

  return JSON.stringify(config.settings || {});
}
