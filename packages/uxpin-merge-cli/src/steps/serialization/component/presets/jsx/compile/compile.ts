import { unlink } from 'fs-extra';
import { join, parse } from 'path';
import * as webpack from 'webpack';
import { ProgramArgs } from '../../../../../../program/args/ProgramArgs';
import { getTempDirPath } from '../../../../../../program/args/providers/paths/getTempDirPath';
import { ComponentPresetInfo } from '../../../../../discovery/component/ComponentInfo';
import { createBundle } from '../bundle/createBundle';
import { getWebpackConfig } from './getWebpackConfig';

export async function compile(programArgs:ProgramArgs, infos:ComponentPresetInfo[]):Promise<string> {
  const sourcePath:string = await createBundle(programArgs, infos);
  const bundlePath:string = await compileWithWebpack(programArgs, sourcePath);
  await unlink(sourcePath);

  return bundlePath;
}

async function compileWithWebpack(programArgs:ProgramArgs, sourcePath:string):Promise<string> {
  const { base } = parse(sourcePath);
  const uxpinDirPath:string = getTempDirPath(programArgs);
  const bundlePath:string = join(uxpinDirPath, `__bundle__${base}`);

  await run(getWebpackConfig({ bundlePath, sourcePath }));

  return bundlePath;
}

function run(webpackConfig:webpack.Configuration):Promise<void> {
  return new Promise((resolve, reject) => {
    const compiler:webpack.Compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      if (stats.hasErrors()) {
        return reject(new Error(stats.toString({ errors: true })));
      }

      resolve();
    });
  });
}
