import * as webpack from 'webpack';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { BuildOptions } from './BuildOptions';
import { getConfig } from './config/getConfig';
import { createComponentsLibrary } from './library/createComponentsLibrary';

export function buildDesignSystem(components:ComponentDefinition[], options:BuildOptions):Promise<webpack.Stats> {
  const { development, webpackConfigPath, wrapperPath, projectRoot } = options;
  return createComponentsLibrary(components, wrapperPath)
    .then(() => bundle(projectRoot, webpackConfigPath, development));
}

function bundle(projectRoot:string, webpackConfigPath?:string, development?:boolean):Promise<webpack.Stats> {
  return new Promise((resolve, reject) => {
    const config:webpack.Configuration = getConfig(projectRoot, webpackConfigPath, development);
    setNodeEnvironment(development);
    const compiler:webpack.Compiler = webpack(config);

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

function setNodeEnvironment(development:boolean = false):void {
  process.env.NODE_ENV = development ? 'development' : 'production';
}
