import * as webpack from 'webpack';
import { Compiler, Stats } from 'webpack';

import { getConfig } from './config/webpack.config';
import { createComponentsLibrary } from './helpers/createComponentsLibrary';
import { getDesignSystemComponents } from './helpers/getDesignSystemComponents';

function bundle(libraries:string[] = []):Promise<Stats> {
  return new Promise((resolve, reject) => {
    const compiler:Compiler = webpack(getConfig(libraries));

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

function createLibrary():Promise<void> {
  return getDesignSystemComponents()
    .then(createComponentsLibrary);
}

export function buildDesignSystem(libraries:string[]):Promise<Stats> {
  return createLibrary()
    .then(() => bundle(libraries));
}
