import { LibraryTarget } from '../config/LibraryTarget';
import { BabelPlugin } from './plugins/BabelPlugin';

export interface BuildOptions {
  babelPlugins:BabelPlugin[];
  wrapperPath?:string;
  target?:LibraryTarget;
}
