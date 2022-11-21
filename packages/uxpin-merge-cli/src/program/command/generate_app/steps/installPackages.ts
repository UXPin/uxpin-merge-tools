import * as cp from 'child_process';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';
import { AppConfig } from '../types/appConfig';

export function installPackages(args: GenerateAppProgramArgs, appConfig: AppConfig): Step {
  return { exec: thunkInstallPackages(args, appConfig), shouldRun: true };
}

export function thunkInstallPackages(args: GenerateAppProgramArgs, appConfig: AppConfig): () => Promise<void> {
  return async () => {
    if (!appConfig.packages || !appConfig.packages.length) {
      return;
    }

    appConfig.packages.forEach((name) => {
      const { status } = cp.spawnSync('npm', ['install', name], {
        cwd: APP_DIRECTORY,
      });

      if (status !== 0) {
        throw new Error('🛑 Something went wrong during installing package');
      }
    });

    const { status: babelLoaderStatus } = cp.spawnSync(
      'npm',
      [
        'install',
        'babel-loader@8.2.5',
        '@babel/core',
        '@babel/preset-env',
        '@babel/preset-react',
        'webpack@4.8.1',
        'uglifyjs-webpack-plugin@2.2.0',
        'prop-types',
      ],
      {
        cwd: APP_DIRECTORY,
      }
    );

    if (babelLoaderStatus !== 0) {
      throw new Error('🛑 Something went wrong during installing babel-loader');
    }

    printLine(`✅ Packages installed`, { color: PrintColor.GREEN });
  };
}
