import { defaults } from 'lodash';
import { AllCmdOptions, CmdOptions } from './CmdOptions';

export function getAllCmdOptions(partialOptions: CmdOptions): AllCmdOptions {
  return defaults(partialOptions, {
    cwd: process.cwd(),
    env: {},
    params: [],
    useTempDir: true,
  });
}
