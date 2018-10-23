import { BuildOptions } from '../BuildOptions';
import { Compiler } from './Compiler';
import { PushCompiler } from './push/PushCompiler';
import { WatchCompiler } from './watch/WatchCompiler';

export function getCompiler(options:BuildOptions):Compiler {
  if (options.development) {
    return new WatchCompiler(options);
  }

  return new PushCompiler(options);
}
