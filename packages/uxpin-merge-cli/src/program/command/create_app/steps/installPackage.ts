import * as cp from 'child_process';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { CreateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';

export function installPackage(args:CreateAppProgramArgs):Step {
  return { exec: thunkInstallPackage(args), shouldRun: true };
}

export function thunkInstallPackage(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
    if (!args.packageName) {
      throw new Error('Invalid package name');
    }

    const { status } = cp.spawnSync('npm', ['install', args.packageName], {
      cwd: APP_DIRECTORY,
    });

    if (status !== 0) {
      throw new Error('🛑 Something went wrong during installing package');
    }

    printLine(
      `✅ Packages "${args.packageName}" installed`,
      { color: PrintColor.GREEN },
    );
  };
}
