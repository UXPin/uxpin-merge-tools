import * as cp from 'child_process';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';
import { AppConfig } from '../types/appConfig';

export function installPeerDependencies(args: GenerateAppProgramArgs, appConfig?: AppConfig): Step {
  return { exec: thunkInstallPeerDependencies(args, appConfig), shouldRun: true };
}

export function thunkInstallPeerDependencies(args: GenerateAppProgramArgs, appConfig?: AppConfig): () => Promise<void> {
  return async () => {
    if (!appConfig || !appConfig.packages || !appConfig.packages.length) {
      return;
    }

    const packageJSON: any = require(`${APP_DIRECTORY}/node_modules/${appConfig.packages[0]}/package.json`);

    const peerDependencies: any = packageJSON.peerDependencies || {};
    Object.keys(peerDependencies).forEach((dependencyName) => {
      const version: string = peerDependencies[dependencyName];
      const { status } = cp.spawnSync('npm', ['install', `${dependencyName}@${version}`], {
        cwd: APP_DIRECTORY,
      });

      if (status !== 0) {
        throw new Error(`🛑  Something went wrong during installing package - ${dependencyName}`);
      }

      printLine(`✅ Peer dependency "${dependencyName}" installed`, { color: PrintColor.GREEN });
    });
  };
}
