import { defaults, noop } from 'lodash';
import { DirectoryResult } from 'tmp-promise';
import { CmdOptions } from '../command/CmdOptions';
import { resolveTestProjectPath } from '../resources/resolveTestProjectPath';
import { prepareTempDir } from '../temp/prepareTempDir';
import { defaultOptions, ExperimentationServerTestSetupOptions } from './experimentationServerTestSetupOptions';

export interface ExperimentationServerConfiguration {
  cmdOptions:CmdOptions;
  port:number;
  workingDir:string;
  cleanupTemp:() => void;
}

export async function getServerConfiguration(
  opts:ExperimentationServerTestSetupOptions,
):Promise<ExperimentationServerConfiguration> {
  const { useTempDir, projectPath, port, serverCmdArgs, env, useExistingServer } = defaults(opts, defaultOptions);
  let workingDir:string = resolveTestProjectPath(projectPath);
  let cleanupTemp:() => void = noop;
  let serverPort:number = port;
  if (useExistingServer) {
    workingDir = resolveTestProjectPath(useExistingServer.projectPath);
    serverPort = useExistingServer.port;
  } else if (useTempDir) {
    const tempDir:DirectoryResult = await prepareTempDir(workingDir);
    workingDir = tempDir.path;
    cleanupTemp = tempDir.cleanup;
  }
  return {
    cleanupTemp,
    cmdOptions: {
      cwd: workingDir,
      env,
      params: [...(serverCmdArgs || []), `--port=${port}`],
    },
    port: serverPort,
    workingDir,
  };
}
