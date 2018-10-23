import * as webpack from 'webpack';
import { BuildOptions } from '../../BuildOptions';
import { getConfig } from '../../config/getConfig';
import { Compiler } from '../Compiler';

export class PushCompiler implements Compiler {
  private compiler:webpack.Compiler;

  constructor(private options:BuildOptions) {
    this.compiler = webpack(getConfig(options));
  }

  public compile():Promise<void> {
    return new Promise((resolve, reject) => {
      this.compiler.run(((err, stats) => {
        if (err) {
          return reject(err);
        }

        if (stats.hasErrors()) {
          return reject(stats.toString({ errors: true }));
        }

        resolve();
      }));
    });
  }

}
