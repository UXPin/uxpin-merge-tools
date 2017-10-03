import { ProjectPaths } from '../paths/ProjectPaths';

export interface ComponentPaths extends ProjectPaths {
  /**
   * component directory path relative to the project root
   */
  componentDirPath:string;
}
