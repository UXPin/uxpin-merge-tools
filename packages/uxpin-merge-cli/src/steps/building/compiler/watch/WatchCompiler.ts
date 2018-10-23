import * as webpack from 'webpack';
import { BuildOptions } from '../../BuildOptions';
import { getConfig } from '../../config/getConfig';
import { Compiler } from '../Compiler';

export class WatchCompiler implements Compiler {
  private readonly config:webpack.Configuration;
  private compiler:webpack.Compiler;

  constructor(private options:BuildOptions) {
    this.config = getConfig(this.options);
    this.compiler = webpack(this.config);
  }

  public compile():Promise<void> {
    return new Promise((resolve, reject) => {
      const watcher:webpack.Compiler.Watching = this.compiler.watch(this.getWatchOptions(), (err, stats) => {
        if (err) {
          return reject(err);
        }

        if (stats.hasErrors()) {
          return reject(stats.toString({ errors: true }));
        }

        /*
          @TODO:  - thunkBuildComponentsLibrary (without compile)
                  - thunkSaveMetadataLibrary
                  - display error when stat.hasErrors()
         */
        resolve();
      });
    });
  }

  private getWatchOptions():webpack.Options.WatchOptions {
    return this.config.watchOptions || {};
  }
}
