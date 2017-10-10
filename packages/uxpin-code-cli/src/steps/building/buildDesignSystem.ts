import * as webpack from 'webpack';

import { ComponentInfo } from '../discovery/component/ComponentInfo';
import { BuildOptions } from './BuildOptions';
import { getConfig } from './config/getConfig';
import { createComponentsLibrary } from './library/createComponentsLibrary';

export function buildDesignSystem(componentInfos:ComponentInfo[], options:BuildOptions):Promise<webpack.Stats> {
  const { webpackConfigPath, wrapperPath, projectRoot } = options;
  return createComponentsLibrary(componentInfos, wrapperPath)
    .then(() => bundle(projectRoot, webpackConfigPath));
}

function bundle(projectRoot:string, webpackConfigPath?:string):Promise<webpack.Stats> {
  return new Promise((resolve, reject) => {
    const compiler:webpack.Compiler = webpack(getConfig(projectRoot, webpackConfigPath));

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
