import { CmdOptions } from '../command/CmdOptions';
import { getRandomPortNumber } from '../e2e/server/getRandomPortNumber';

export type ExperimentationServerTestSetupOptions = Partial<ExperimentationServerOptionsWithDefaults>;

export interface ExperimentationServerOptionsWithDefaults {
  serverCmdArgs?:string[];
  projectPath:string;
  env?:CmdOptions['env'];
  port:number;
  useTempDir:boolean;
}

export const defaultOptions:ExperimentationServerOptionsWithDefaults = {
  port: getRandomPortNumber(),
  projectPath: 'resources/designSystems/noSrcDir',
  useTempDir: false,
};
