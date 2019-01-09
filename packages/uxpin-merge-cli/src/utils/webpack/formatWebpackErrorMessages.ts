import { Stats } from 'webpack';

export function formatWebpackErrorMessages(stats:Stats):string {
  return stats.toString({
    assets: false,
    chunkModules: false,
    colors: true,
    entrypoints: false,
    errors: true,
    hash: false,
    modules: false,
    timings: false,
    version: false,
  });
}
