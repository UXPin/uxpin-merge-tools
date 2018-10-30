import * as webpack from 'webpack';
import { formatWebpackErrorMessages } from '../../../../utils/webpack/formatWebpackErrorMessages';
import { BuildOptions } from '../../BuildOptions';
import { getConfig } from '../../config/getConfig';
import { Compiler } from '../Compiler';

export class WebpackCompiler implements Compiler {
  private readonly config:webpack.Configuration;
  private compiler:webpack.Compiler;

  constructor(options:BuildOptions) {
    this.config = getConfig(options);
    this.compiler = webpack(this.config);
  }

  public compile():Promise<void> {
    return new Promise((resolve, reject) => {
      this.compiler.run(((err, stats) => {
        if (err) {
          return reject(err);
        }

        if (stats.hasErrors()) {
          return reject(formatWebpackErrorMessages(stats));
        }

        resolve();
      }));
    });
  }

}
