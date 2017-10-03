import { stringifyWarnings } from '../common/warning/stringifyWarnings';
import { tapPromise } from '../utils/promise/tapPromise';
import { buildDesignSystem } from './building/buildDesignSystem';
import { BuildOptions } from './building/BuildOptions';
import { ComponentInfo } from './discovery/components/ComponentInfo';
import { getDesignSystemComponentInfos } from './discovery/components/getDesignSystemComponentInfos';
import { getDesignSystemSummary } from './discovery/getDesignSystemSummary';
import { ProgramArgs } from './ProgramArgs';
import { getDesignSystemMetadata } from './serialization/getDesignSystemMetadata';
import { printDump } from './serialization/printDump';

export function performSteps(args:ProgramArgs):Promise<any> {
  const { dump, summary, target, webpackConfig, wrapper } = args;

  if (summary) {
    return getDesignSystemComponentInfos()
      .then(getDesignSystemSummary)
      .then(console.log)
      .catch(logError);
  }
  if (dump) {
    return getDesignSystemComponentInfos()
      .then(printDump)
      .catch(logError);
  }

  const buildOptions:BuildOptions = { target, webpackConfigPath: webpackConfig, wrapperPath: wrapper };

  return getDesignSystemComponentInfos()
    .then(tapPromise((infos) => buildDesignSystem(infos, buildOptions)))
    .then(tapPromise((infos) => console.log(getDesignSystemSummary(infos))))
    .then(tapPromise(printSerializationWarnings))
    .catch(logError);
}

function printSerializationWarnings(infos:ComponentInfo[]):Promise<any> {
  return getDesignSystemMetadata(infos).then(({ warnings }) => console.log(stringifyWarnings(warnings)));
}

function logError(errorMessage:string):void {
  console.log('ERROR:', errorMessage);
}
