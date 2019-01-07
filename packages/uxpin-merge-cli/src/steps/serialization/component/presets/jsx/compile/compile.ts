import { unlink } from 'fs-extra';
import { join, parse } from 'path';
import * as webpack from 'webpack';
import { ProgramArgs, RawProgramArgs } from '../../../../../../program/args/ProgramArgs';
import { getProjectRoot } from '../../../../../../program/args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../../../../../program/args/providers/paths/getTempDirPath';
import { ComponentCategoryInfo } from '../../../../../discovery/component/category/ComponentCategoryInfo';
import { createBundleSource } from '../bundle/createBundleSource';
import { getWebpackConfig } from './getWebpackConfig';

export async function compile(programArgs:ProgramArgs, infos:ComponentCategoryInfo[]):Promise<string> {
  const sourcePath:string = await createBundleSource(programArgs, infos);
  const bundlePath:string = await compileWithWebpack(programArgs, sourcePath);
  await unlink(sourcePath);

  return bundlePath;
}

async function compileWithWebpack(programArgs:ProgramArgs, sourcePath:string):Promise<string> {
  const { base } = parse(sourcePath);
  const uxpinDirPath:string = getTempDirPath(programArgs);
  const bundlePath:string = join(uxpinDirPath, `__bundle__${base}`);
  const { webpackConfig } = programArgs as RawProgramArgs;
  const projectRoot:string = getProjectRoot(programArgs);

  await run(getWebpackConfig({ bundlePath, projectRoot, sourcePath, webpackConfig }));

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
