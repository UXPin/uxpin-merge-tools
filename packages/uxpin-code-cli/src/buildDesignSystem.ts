import * as webpack from 'webpack';

import { createComponentsLibrary } from './building/library/createComponentsLibrary';
import { LibraryTarget } from './config/LibraryTarget';
import { getConfig } from './config/webpack.config';
import { getDesignSystemComponentInfos } from './discovery/components/getDesignSystemComponentInfos';

export function buildDesignSystem(webpackConfigPath?:string, wrapperPath?:string,
  target?:LibraryTarget):Promise<webpack.Stats> {
  return createLibrary(wrapperPath)
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

function createLibrary(wrapperPath?:string):Promise<string> {
  return getDesignSystemComponentInfos()
    .then((componentInfos) => createComponentsLibrary(componentInfos, wrapperPath));
}
