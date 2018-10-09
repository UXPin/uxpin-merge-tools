import pReduce = require('p-reduce');

import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { readFile } from '../../../../utils/fs/readFile';
import { ComponentPresetInfo } from '../../../discovery/component/ComponentInfo';
import { getPresetName } from '../../../discovery/component/presets/presetFileNameParser';
import { ComponentPresetData } from './ComponentPreset';
import { PresetsSerializationResult } from './PresetsSerializationResult';

export function serializePresets(infos:ComponentPresetInfo[]):Promise<PresetsSerializationResult> {
  const aggregator:PresetsSerializationResult = { result: [], warnings: [] };
  return pReduce(infos.map(serializePreset), (result, presetSerializationResult) => {
    [].push.apply(result.result, presetSerializationResult.result);
    [].push.apply(result.warnings, presetSerializationResult.warnings);
    return result;
  }, aggregator);
}

function serializePreset(info:ComponentPresetInfo):Promise<PresetsSerializationResult> {
  return readFile(info.path, { encoding: 'utf8' })
    .then((content) => JSON.parse(content))
    .then((presetData:ComponentPresetData) => ({
      result: [{
        name: getPresetName(info.path),
        ...presetData,
      }],
      warnings: [],
    }))
    .catch(thunkGetResultForInvalidPreset(info.path));
}

function thunkGetResultForInvalidPreset(sourcePath:string):(e:Error) => PresetsSerializationResult {
  return (originalError) => {
    const warning:WarningDetails = {
      message: 'Cannot serialize component preset',
      originalError,
      sourcePath,
    };
    return { result: [], warnings: [warning] };
  };
}
