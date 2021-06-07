import pMapSeries = require('p-map-series');
import { Framework } from '../../../framework/framework';
import { FrameworkModule } from '../../../framework/FrameworkModule';
import { ComponentCategoryInfo } from '../../../steps/discovery/component/category/ComponentCategoryInfo';
import { getComponentCategoryInfos } from '../../../steps/discovery/component/category/getComponentCategoryInfos';
import { ComponentInfo } from '../../../steps/discovery/component/ComponentInfo';
import { printError } from '../../../utils/console/printLine';
import { GeneratePresetsProgramArgs } from '../../args/ProgramArgs';
import { getProjectPaths } from '../../args/providers/paths/getProjectPaths';
import { Step } from '../Step';

export function getGeneratePresetsCommandSteps(args:GeneratePresetsProgramArgs):Step[] {
  return [
    { exec: thunkGenerateFiles(args), shouldRun: true },
  ];
}

async function generatePresetFile(path:string):Promise<void> {
  try {
    // tslint:disable-next-line:variable-name
    const PresetFileGenerator:FrameworkModule['PresetFileGenerator'] = Framework.loadFrameworkModule(
      'PresetFileGenerator',
    );
    const presetFile:FrameworkModule['PresetFileGenerator'] = new PresetFileGenerator(path);
    await presetFile.init();
    await presetFile.createPresetFile();
  } catch (e) {
    printError(e.message);
  }
}

function thunkGenerateFiles(args:GeneratePresetsProgramArgs):() => Promise<void> {
  return async () => {
    const { componentPath } = args;

    if (componentPath) {
      await generatePresetFile(componentPath);
    } else {
      const data:ComponentCategoryInfo[] = await getComponentCategoryInfos(getProjectPaths(args));
      pMapSeries(data, (component:ComponentCategoryInfo) => {
        pMapSeries(component.componentInfos, async (info:ComponentInfo) => {
          await generatePresetFile(info.implementation.path);
        });
      });
    }
  };
}
