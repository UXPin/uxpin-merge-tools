import * as cp from 'child_process';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { CreateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';

export function installPeerDependencies(args:CreateAppProgramArgs):Step {
  return { exec: thunkInstallPeerDependencies(args), shouldRun: true };
}

export function thunkInstallPeerDependencies(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
    const packageJSON:any = require(`${APP_DIRECTORY}/node_modules/${args.packageName}/package.json`);

    const peerDependencies:any = packageJSON.peerDependencies || {};
    Object.keys(peerDependencies).forEach((dependencyName) => {
      const version:string = peerDependencies[dependencyName];
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
