import { resolve } from 'path';
import { CmdOptions } from '../command/CmdOptions';
import { getRandomPortNumber } from '../e2e/server/getRandomPortNumber';

export type ExperimentationServerTestSetupOptions = Partial<ExperimentationServerOptionsWithDefaults>;

export interface ExperimentationServerOptionsWithDefaults {
  env?:CmdOptions['env'];
  port:number;
  projectPath:string;
  serverCmdArgs?:string[];
  serverFailOutput?:string|RegExp;
  serverReadyOutput?:string|RegExp;
  silent:boolean;
  sourceDir:string;
  useExistingServer?:ExistingServerConfiguration;
  useTempDir:boolean;
}

export function getDefaultOptions():ExperimentationServerOptionsWithDefaults {
  return {
    port: getRandomPortNumber(),
    projectPath: resolve(__dirname, '../../../'),
    silent: false,
    sourceDir: 'resources/designSystems/noSrcDir',
    useTempDir: true,
  };
}

export interface ExistingServerConfiguration {
  port:number;
  projectPath:string;
}
