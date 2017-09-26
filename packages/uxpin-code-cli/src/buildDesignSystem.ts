import * as webpack from 'webpack';

import { createComponentsLibrary } from './building/library/createComponentsLibrary';
import { BabelPlugin } from './building/plugins/BabelPlugin';
import { getDesignSystemComponentInfos } from './components/getDesignSystemComponentInfos';
import { LibraryTarget } from './config/LibraryTarget';
import { getConfig } from './config/webpack.config';

export function buildDesignSystem(babelPlugins:BabelPlugin[], wrapperPath?:string,
  target?:LibraryTarget):Promise<webpack.Stats> {
  return createLibrary(wrapperPath)
    .then(() => bundle(babelPlugins, target));
}

function bundle(babelPlugins:BabelPlugin[] = [], target?:LibraryTarget):Promise<webpack.Stats> {
  return new Promise((resolve, reject) => {
    const compiler:webpack.Compiler = webpack(getConfig(babelPlugins, target));

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
