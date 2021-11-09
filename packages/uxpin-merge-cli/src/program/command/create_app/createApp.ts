import { CreateAppProgramArgs } from '../../args/ProgramArgs';
import { Step } from '../Step';
import { createAppDirectory } from './steps/createAppDirectory';
import { createPackageJsonFile } from './steps/createPackageJsonFile';
import { createTmpDirectory } from './steps/createTmpDirectory';
import { installPackage } from './steps/installPackage';
import { installPeerDependencies } from './steps/installPeerDependencies';

export function createApp(args:CreateAppProgramArgs):Step[] {
  return [
    createTmpDirectory(),
    createAppDirectory(args),
    createPackageJsonFile(args),
    installPackage(args),
    installPeerDependencies(args),
    { exec: thunkGenerateFiles(args), shouldRun: true },
  ];
}

function thunkGenerateFiles(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
   // console.log(args);
  };
}
