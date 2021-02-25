import { copySync, existsSync, PathLike } from 'fs-extra';
import { resolve } from 'path';
import { printLine } from '../../../utils/console/printLine';
import { PrintColor } from '../../../utils/console/PrintOptions';
import { InitProgramArgs } from '../../args/ProgramArgs';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { Step } from '../Step';

const RESOURCES_PATH:PathLike = '../../../resources';

export interface DefaultFile {
  source:PathLike;
  target:PathLike;
}

const DEFAULT_CONFIG_FILES:DefaultFile[] = [
  { source: 'uxpin.config.js', target: 'uxpin.config.js' },
  { source: 'uxpin.webpack.config.js', target: 'uxpin.webpack.config.js' },
  { source: 'UXPinWrapper.js', target: 'src/components/UXPinWrapper/UXPinWrapper.js' },
];

const EXAMPLE_COMPONENT:DefaultFile = {
  source: 'Button',
  target: 'src/components/Button',
};

export function getInitCommandSteps(args:InitProgramArgs):Step[] {
  return [
    { exec: copyDefaultFiles(args), shouldRun: true },
  ];
}

function copyDefaultFiles(args:InitProgramArgs):any {
  const projectRoot:PathLike = getProjectRoot(args);
  try {
    // config files
    DEFAULT_CONFIG_FILES.forEach((file) => {
      const filePath:PathLike = `${projectRoot}/${file.target}`;
      if (!existsSync(filePath)) {
        copySync(resolve(__dirname, `${RESOURCES_PATH}/${file.source}`), filePath);
        printLine(`✅ Successfully created ${filePath}`, { color: PrintColor.GREEN });
      }
    });

    // default component
    const componentPath:PathLike = `${projectRoot}/${EXAMPLE_COMPONENT.target}`;
    if (!existsSync(componentPath)) {
      copySync(resolve(__dirname, `${RESOURCES_PATH}/${EXAMPLE_COMPONENT.source}`), componentPath);
      printLine(`✅ Successfully created example component in ${componentPath}`, { color: PrintColor.GREEN });
    }
  } catch (error) {
    printLine('🛑 There was an error while copying default config files. Please try again.', { color: PrintColor.RED });
    throw new Error(error.message);
  }
}
