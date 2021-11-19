import { CreateAppProgramArgs } from '../../args/ProgramArgs';
import { Step } from '../Step';
import { createAppDirectory } from './steps/createAppDirectory';
import { createPackageJsonFile } from './steps/createPackageJsonFile';
import { createTmpDirectory } from './steps/createTmpDirectory';
import { createUXPinConfigFile } from './steps/createUXPinConfigFile';
import { installPackage } from './steps/installPackage';
import { installPeerDependencies } from './steps/installPeerDependencies';

export function createApp(args:CreateAppProgramArgs):Step[] {
  return [
    createTmpDirectory(),
    createAppDirectory(args),
    createPackageJsonFile(args),
    installPackage(args),
    installPeerDependencies(args),
    createUXPinConfigFile(args),
  ];
}
