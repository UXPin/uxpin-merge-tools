import * as webpack from 'webpack';
import { Compiler, Stats } from 'webpack';

import { createComponentsLibrary } from './building/library/createComponentsLibrary';
import { BabelPlugin } from './building/plugins/BabelPluginDefinition';
import { getDesignSystemComponentLocations } from './components/getDesignSystemComponentLocations';
import { getConfig } from './config/webpack.config';

export function buildDesignSystem(babelPlugins:BabelPlugin[], wrapper:string, target:string):Promise<Stats> {
  return createLibrary(wrapper)
    .then(() => bundle(babelPlugins, target));
}

function bundle(babelPlugins:BabelPlugin[] = [], target:string):Promise<Stats> {
  return new Promise((resolve, reject) => {
    const compiler:Compiler = webpack(getConfig(babelPlugins, target));

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

function createLibrary(wrapper:string):Promise<void> {
  return getDesignSystemComponentLocations()
    .then((components) => createComponentsLibrary(components, wrapper));
}
