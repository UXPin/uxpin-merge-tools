import { BuildOptions } from '../BuildOptions';
import { getConfig } from '../config/getConfig';
import { Compiler } from './Compiler';
import { WebpackCompiler } from './webpack/WebpackCompiler';

export function getCompiler(options:BuildOptions):Compiler {
  return new WebpackCompiler(getConfig(options), options.storybook);
}
