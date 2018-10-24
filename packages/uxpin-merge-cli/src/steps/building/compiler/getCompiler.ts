import { BuildOptions } from '../BuildOptions';
import { Compiler } from './Compiler';
import { WebpackCompiler } from './webpack/WebpackCompiler';

export function getCompiler(options:BuildOptions):Compiler {
  return new WebpackCompiler(options);
}
