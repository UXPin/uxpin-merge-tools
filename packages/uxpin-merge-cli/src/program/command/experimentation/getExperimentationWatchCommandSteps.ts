import { print } from '../../../utils/console/print';
import { printLine } from '../../../utils/console/printLine';
import { PrintColor } from '../../../utils/console/PrintOptions';
import { ExperimentProgramArgs } from '../../args/ProgramArgs';
import { Step } from '../Step';
import { experimentationBuildLibraryStep } from './steps/experimentationBuildLibraryStep';
import { experimentationPrepareMetadataStep } from './steps/experimentationPrepareMetadataStep';

export const COMPILATION_SUCCESS_MESSAGE = '🌐 Compiled successfully! Now you can refresh your browser.';

export function getExperimentationWatchCommandSteps(args: ExperimentProgramArgs): Step[] {
  return [
    onCompilationStart(),
    experimentationBuildLibraryStep(args),
    experimentationPrepareMetadataStep(args),
    onCompilationEnd(),
  ];
}

function onCompilationStart(): Step {
  return {
    exec: () => print('🎩 Hang on to your hat! Compilation in progress...', { color: PrintColor.YELLOW }),
    shouldRun: true,
  };
}

function onCompilationEnd(): Step {
  return {
    exec: () => printLine(`\r${COMPILATION_SUCCESS_MESSAGE}`),
    shouldRun: true,
  };
}
