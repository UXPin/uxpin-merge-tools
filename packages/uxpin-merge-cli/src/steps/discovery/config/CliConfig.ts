import { ConfigEnabledProgramArgs } from '../../../program/args/ProgramArgs';

export interface CliConfig {
  components: ComponentsConfig;
  name?: string;
  settings?: {
    customComponentName?: string;
    componentType?: string;
  };
}

export interface ComponentsConfig extends ConfigEnabledProgramArgs {
  categories: CategoryConfig[];
}

export interface CategoryConfig {
  name: string;
  /**
   * single glob pattern or list of glob patters of component files to be included in the category
   *
   * @example
   * multiple glob patters matching particular component files:
   * ```
   * include: [
   *   "src/patterns/Card/Card.jsx",
   *   "src/patterns/Modal/Modal.jsx",
   * ],
   * ```
   * @example
   * single glob pattern matching all component in subdirectories in a directory:
   * ```
   * include: "src/components/*\/*.js",
   * ```
   */
  include: string | string[];
}
