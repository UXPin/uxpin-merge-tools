import * as webpack from 'webpack';
import { BuildOptions } from './building/BuildOptions';
import { createComponentsLibrary } from './building/library/createComponentsLibrary';
import { LibraryTarget } from './config/LibraryTarget';
import { getConfig } from './config/webpack.config';
import { ComponentInfo } from './discovery/components/ComponentInfo';

export function buildDesignSystem(componentInfos:ComponentInfo[], options:BuildOptions):Promise<webpack.Stats> {
  const { target, webpackConfigPath, wrapperPath } = options;
  return createComponentsLibrary(componentInfos, wrapperPath)
    .then(() => bundle(webpackConfigPath, target));
}

function bundle(webpackConfigPath?:string, target?:LibraryTarget):Promise<webpack.Stats> {
  return new Promise((resolve, reject) => {
    const compiler:webpack.Compiler = webpack(getConfig(webpackConfigPath, target));

    compiler.run((err, stats) => {
      if (err) {
        return reject(err.message);
      }

      if (stats.hasErrors()) {
        return reject(stats.toString({ errors: true }));
      }

      resolve(stats);
    });
  });
}
