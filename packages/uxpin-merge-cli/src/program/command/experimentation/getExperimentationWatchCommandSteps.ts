import { print } from '../../../utils/console/print';
import { printLine } from '../../../utils/console/printLine';
import { PrintColor } from '../../../utils/console/PrintOptions';
import { ExperimentProgramArgs } from '../../args/ProgramArgs';
import { Step } from '../Step';
import { experimentationBuildLibraryStep } from './steps/experimentationBuildLibraryStep';
import { experimentationPrepareMetadataStep } from './steps/experimentationPrepareMetadataStep';
import { ExperimentationState } from './getExperimentationCommandSteps';
import { Store } from '../../../program/utils/store/Store';

export const COMPILATION_SUCCESS_MESSAGE:string = '🌐 Compiled successfully! Now you can refresh your browser.';

const defaultState:ExperimentationState = {
  ngrokUrl: null,
};

export function getExperimentationWatchCommandSteps(args:ExperimentProgramArgs):Step[] {
  const store:Store<ExperimentationState> = new Store(defaultState);

  return [
    onCompilationStart(),
    experimentationBuildLibraryStep(args, store),
    experimentationPrepareMetadataStep(args, store),
    onCompilationEnd(),
  ];
}

function onCompilationStart():Step {
  return {
    exec: () => print('🎩 Hang on to your hat! Compilation in progress...', { color: PrintColor.YELLOW }),
    shouldRun: true,
  };
}

function onCompilationEnd():Step {
  return {
    exec: () => printLine(`\r${COMPILATION_SUCCESS_MESSAGE}`),
    shouldRun: true,
  };
}
