import * as webpack from 'webpack';
import { Compiler, Stats } from 'webpack';

import { config } from './config/webpack.config';

function bundle():Promise<Stats> {
  return new Promise((resolve, reject) => {
    const compiler:Compiler = webpack(config);

    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      resolve(stats);
    });
  });
}

export function buildDesignSystem():Promise<Stats> {
  return bundle();
}
