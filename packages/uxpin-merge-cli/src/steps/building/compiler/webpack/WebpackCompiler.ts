import * as webpack from 'webpack';
import { formatWebpackErrorMessages } from '../../../../utils/webpack/formatWebpackErrorMessages';
import { Compiler } from '../Compiler';
import { getStorybookWebpack } from './getStorybookWebpack';

export class WebpackCompiler implements Compiler {
  private compiler:webpack.Compiler;

  constructor(private readonly config:webpack.Configuration, storybook:boolean = false) {
    if (storybook) {
      this.compiler = getStorybookWebpack(this.config);
    } else {
      this.compiler = webpack(this.config);
    }
  }

  public compile():Promise<void> {
    return new Promise((resolve, reject) => {
      this.compiler.run(((err, stats) => {
        if (err) {
          return reject(err);
        }

        if (stats.hasErrors()) {
          return reject(new Error(formatWebpackErrorMessages(stats)));
        }

        resolve();
      }));
    });
  }

}
