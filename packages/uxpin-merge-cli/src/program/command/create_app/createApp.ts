import { CreateAppProgramArgs } from '../../args/ProgramArgs';
import { Step } from '../Step';

export function createApp(args:CreateAppProgramArgs):Step[] {
  return [
    { exec: thunkGenerateFiles(args), shouldRun: true },
  ];
}

function thunkGenerateFiles(args:CreateAppProgramArgs):() => Promise<void> {
  return async () => {
    console.log(args);
  };
}
