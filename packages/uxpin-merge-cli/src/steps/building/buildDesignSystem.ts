import * as webpack from 'webpack';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { BuildOptions } from './BuildOptions';
import { getConfig } from './config/getConfig';
import { createComponentsLibrary } from './library/createComponentsLibrary';

export async function buildDesignSystem(components:ComponentDefinition[], options:BuildOptions):Promise<webpack.Stats> {
  await createComponentsLibrary(components, options);
  return bundle(options);
}

function bundle(options:BuildOptions):Promise<webpack.Stats> {
  return new Promise((resolve, reject) => {
    const config:webpack.Configuration = getConfig(options);
    setNodeEnvironment(options.development);
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
