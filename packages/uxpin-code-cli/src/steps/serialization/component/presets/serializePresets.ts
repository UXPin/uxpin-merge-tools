import pReduce = require('p-reduce');

import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { readFile } from '../../../../utils/fs/readFile';
import { getPresetNameFromPath } from './getPresetNameFromPath';
import { PresetsSerializationResult } from './PresetsSerializationResult';

export function serializePresets(paths:string[]):Promise<PresetsSerializationResult> {
  const aggregator:PresetsSerializationResult = { result: [], warnings: [] };
  return pReduce(paths.map(serializePreset), (result, presetSerializationResult) => {
    [].push.apply(result.result, presetSerializationResult.result);
    [].push.apply(result.warnings, presetSerializationResult.warnings);
    return result;
  }, aggregator);
}

function serializePreset(path:string):Promise<PresetsSerializationResult> {
  return readFile(path, { encoding: 'utf8' })
    .then((content) => JSON.parse(content))
    .then((properties) => ({
      result: [{
        name: getPresetNameFromPath(path),
        properties,
      }],
      warnings: [],
    }))
    .catch(thunkGetResultForInvalidPreset(path));
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
