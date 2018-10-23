import * as webpack from 'webpack';
import { printLine } from '../../../../utils/console/printLine';
import { BuildOptions } from '../../BuildOptions';
import { getConfig } from '../../config/getConfig';
import { Compiler } from '../Compiler';

const SUCCESS_MESSAGE:string = '🌐 Compiled successfully! You can refresh your browser.';

export class WatchCompiler implements Compiler {
  private readonly config:webpack.Configuration;
  private compiler:webpack.Compiler;
  private watcher?:webpack.Compiler.Watching;

  constructor(private options:BuildOptions) {
    this.config = getConfig(this.options);
    this.compiler = webpack(this.config);
  }

  public compile():Promise<void> {
    return new Promise((resolve, reject) => {
      const watchHandler:webpack.Compiler.Handler = setupHandler(
        this.thunkInitWatcher(resolve, reject),
        this.handleCompilationSuccess,
      );

      this.watcher = this.compiler.watch(this.getWatchOptions(), watchHandler);
    });
  }

  private thunkInitWatcher(
    resolve:(value?:void | PromiseLike<void> | undefined) => void,
    reject:(reason?:any) => void,
  ):webpack.ICompiler.Handler {
    return (err, stats) => {
      const errorMessage:string = getErrorMessage(err, stats);
      if (errorMessage && this.watcher) {
        return this.watcher.close(() => reject(errorMessage));
      }

      resolve();
    };
  }

  // tslint:disable:prefer-function-over-method
  private handleCompilationSuccess:webpack.Compiler.Handler = (err, stats) => {
    const errorMessage:string = getErrorMessage(err, stats);
    if (errorMessage) {
      return printLine(errorMessage);
    }

    /*
      @TODO:  - thunkBuildComponentsLibrary (without compile)
              - thunkSaveMetadataLibrary
              - display error when stat.hasErrors()
     */
    printLine(SUCCESS_MESSAGE);
  }

  private getWatchOptions():webpack.Options.WatchOptions {
    return this.config.watchOptions || {};
  }
}

function setupHandler(firstCall:webpack.Compiler.Handler, restCall:webpack.Compiler.Handler):webpack.Compiler.Handler {
  const INIT_CALLS:number = 2;
  let calls:number = 0;
  return (err, stats) => {
    if (calls < INIT_CALLS) {
      calls += 1;
      return firstCall(err, stats);
    }

    return restCall(err, stats);
  };
}

function getErrorMessage(err:Error, stats:webpack.Stats):string {
  if (!err && !stats.hasErrors()) {
    return '';
  }

  return err ? `${err.message}\n${err.stack}` : stats.toString({ errors: true });
}
