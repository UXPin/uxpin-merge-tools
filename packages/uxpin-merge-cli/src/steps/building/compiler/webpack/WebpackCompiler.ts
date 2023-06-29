import debug from 'debug';
import prettyBytes = require('pretty-bytes');
import * as path from 'path';
import * as webpack from 'webpack';
import { formatWebpackErrorMessages } from '../../../../utils/webpack/formatWebpackErrorMessages';
import { Compiler } from '../Compiler';

const log = debug('uxpin:webpack');
export class WebpackCompiler implements Compiler {
  private compiler: webpack.Compiler;

  constructor(private readonly config: webpack.Configuration) {
    this.compiler = webpack(this.config);
  }

  public compile(): Promise<void> {
    log(`Compile with Webpack ${webpack.version} ${logInput(this.config)}`);
    return new Promise((resolve, reject) => {
      this.compiler.run((err, stats) => {
        if (err) {
          return reject(err);
        }

        if (stats) logOutput(stats);

        if (stats?.hasErrors()) {
          return reject(new Error(formatWebpackErrorMessages(stats)));
        }

        resolve();
      });
    });
  }
}

function logInput(config: webpack.Configuration) {
  const entries = config.entry;
  if (Array.isArray(entries)) return (entries as string[]).map(getFilename).join(', ');
  if (typeof entries === 'string') return getFilename(entries as string);
  return '';
}

function logOutput(stats: webpack.Stats) {
  const assets = stats.toJson().assets || [];
  log(`Output ${assets.map(logAssetSummary).join(', ')}`);
}

function logAssetSummary(asset: { name: string; size: number }) {
  // TODO: Webpack does not export `StatAsset` type?
  return asset.name + ': ' + prettyBytes(asset.size);
}

function getFilename(filepath: string) {
  return path.parse(filepath).base;
}
