import { copySync, existsSync, PathLike } from 'fs-extra';
import { resolve } from 'path';
import { printLine } from '../../../utils/console/printLine';
import { PrintColor } from '../../../utils/console/PrintOptions';
import { InitProgramArgs } from '../../args/ProgramArgs';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { Step } from '../Step';

const RESOURCES_PATH:PathLike = '../../../../resources/';
const DEFAULT_FILES:string[] = [
  'uxpin.config.js',
  'uxpin.webpack.config.js',
  'src/Wrapper/UXPinWrapper.js',
];

export function getInitCommandSteps(args:InitProgramArgs):Step[] {
  return [
    { exec: copyDefaultFiles(args), shouldRun: true },
  ];
}

function copyDefaultFiles(args:InitProgramArgs):any {
  const projectRoot:PathLike = getProjectRoot(args);
  try {
    DEFAULT_FILES.forEach((file) => {
      const filePath:PathLike = projectRoot + '/' + file;
      if (!existsSync(filePath)) {
        const sourcePath:PathLike = resolve(__dirname, RESOURCES_PATH + file.substring(file.lastIndexOf('/') + 1));
        copySync(sourcePath, filePath);
      }
    });
  } catch (error) {
    printLine('🛑 There was an error while copying default config files. Please try again.', { color: PrintColor.RED });
    throw new Error(error.message);
  }
}
