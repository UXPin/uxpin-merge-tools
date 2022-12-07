import * as cp from 'child_process';
import { uniq, flatten } from 'lodash';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';
import { AppConfig } from '../types/appConfig';
import { SUPPORTED_LOADERS } from '../constants/webpackLoaders';

export function installPackages(args: GenerateAppProgramArgs, appConfig?: AppConfig): Step {
  return { exec: thunkInstallPackages(args, appConfig), shouldRun: true };
}

export function thunkInstallPackages(args: GenerateAppProgramArgs, appConfig?: AppConfig): () => Promise<void> {
  return async () => {
    if (!appConfig || ((!appConfig.packages || !appConfig.packages.length) && !appConfig.webpack)) {
      return;
    }

    if (appConfig.packages) {
      appConfig.packages.forEach((name) => {
        const { status } = cp.spawnSync('npm', ['install', name], {
          cwd: APP_DIRECTORY,
        });

        if (status !== 0) {
          throw new Error('🛑 Something went wrong during installing package');
        }
      });
    }

    const webpackLoaders =
      appConfig.webpack && appConfig.webpackLoaders
        ? uniq(flatten(appConfig.webpackLoaders.map((loader) => SUPPORTED_LOADERS[loader] || [])))
        : [];

    const args = [
      'install',
      appConfig.webpack ? 'babel-loader@8.2.5' : '',
      appConfig.webpack ? '@babel/core' : '',
      appConfig.webpack ? '@babel/preset-env' : '',
      appConfig.webpack ? '@babel/preset-react' : '',
      appConfig.webpack ? 'webpack@4.40.2' : '',
      appConfig.webpack ? 'uglifyjs-webpack-plugin@2.2.0' : '',
      ...webpackLoaders,
    ].filter(Boolean);

    if (args.length > 1) {
      const { status: babelLoaderStatus, stderr } = cp.spawnSync('npm', args, {
        cwd: APP_DIRECTORY,
      });

      if (babelLoaderStatus !== 0) {
        throw new Error('🛑 Something went wrong during installing packages');
      }

      printLine(`✅ Packages installed`, { color: PrintColor.GREEN });
    }
  };
}
