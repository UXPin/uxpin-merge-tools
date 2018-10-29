import { CmdOptions } from '../command/CmdOptions';
import { getRandomPortNumber } from '../e2e/server/getRandomPortNumber';

export type ExperimentationServerTestSetupOptions = Partial<ExperimentationServerOptionsWithDefaults>;

export interface ExperimentationServerOptionsWithDefaults {
  serverCmdArgs?:string[];
  projectPath:string;
  env?:CmdOptions['env'];
  port:number;
  silent:boolean;
  useTempDir:boolean;
  useExistingServer?:ExistingServerConfiguration;
}

export const defaultOptions:ExperimentationServerOptionsWithDefaults = {
  port: getRandomPortNumber(),
  projectPath: 'resources/designSystems/noSrcDir',
  silent: false,
  useTempDir: true,
};

export interface ExistingServerConfiguration {
  port:number;
  projectPath:string;
}
