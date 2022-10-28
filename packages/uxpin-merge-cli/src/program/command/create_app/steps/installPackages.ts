import * as cp from 'child_process';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { CreateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';

export function installPackages(args:CreateAppProgramArgs):Step {
  return { exec: thunkInstallPackages(args), shouldRun: true };
}

export function thunkInstallPackages(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
    if (!args.packages) {
      throw new Error('Invalid package names');
    }

    let packages:Array<{ name:string, version?:string}> = [];
    try {
      packages = JSON.parse(args.packages || '');
    } catch (e) {
      console.log(e);
      // do nothing
    }

    packages.forEach(({ name, version }) => {
      const packageName:string = version ? `${name}@${version}` : name;
      const { status } = cp.spawnSync('npm', ['install', packageName], {
        cwd: APP_DIRECTORY,
      });

      if (status !== 0) {
        throw new Error('🛑 Something went wrong during installing package');
      }
    });

    const { status: babelLoaderStatus } = cp.spawnSync(
      'npm', ['install',
        'babel-loader@8.2.5',
        '@babel/core',
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        'style-loader@1.0.0',
        'css-loader@0.23.1',
        'webpack@4.8.1',
        'uglifyjs-webpack-plugin@2.2.0',
        'prop-types',
      ], {
        cwd: APP_DIRECTORY,
      });

    if (babelLoaderStatus !== 0) {
      throw new Error('🛑 Something went wrong during installing babel-loader');
    }

    printLine(
        // tslint:disable-next-line:max-line-length
      `✅ Packages "${packages.map(({ name }) => name).join(' ')} babel-loader @babel/core @babel/preset-env webpack" installed`,
      { color: PrintColor.GREEN },
    );
  };
}
