import * as webpack from 'webpack';
import { Compiler, Stats } from 'webpack';

import { getConfig } from './config/webpack.config';
import { createComponentsLibrary } from './helpers/createComponentsLibrary';
import { getDesignSystemComponents } from './helpers/getDesignSystemComponents';

function bundle(libraries:string[] = [], target:string):Promise<Stats> {
  return new Promise((resolve, reject) => {
    const compiler:Compiler = webpack(getConfig(libraries, target));

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
  return getDesignSystemComponents()
    .then((components) => createComponentsLibrary(components, wrapper));
}

export function buildDesignSystem(libraries:string[], wrapper:string, target:string):Promise<Stats> {
  return createLibrary(wrapper)
    .then(() => bundle(libraries, target));
}
