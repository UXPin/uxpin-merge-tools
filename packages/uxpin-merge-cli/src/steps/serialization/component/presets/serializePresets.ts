import { thunkFillSourcePath } from '../../../../common/warning/thunkFillSourcePath';
import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ComponentPresetInfo } from '../../../discovery/component/ComponentInfo';
import { getPresetName } from '../../../discovery/component/presets/presetFileNameParser';
import { collectPresetElements } from './collectPresetElements';
import { getUniqPresetImportName } from './jsx/bundle/getUniqPresetImportName';
import { PresetsBundle } from './jsx/bundle/PresetsBundle';
import { JSXSerializedElement } from './jsx/JSXSerializationResult';
import { PresetsSerializationResult } from './PresetsSerializationResult';

export function serializePresets(
  bundle:PresetsBundle,
  infos:ComponentPresetInfo[],
):PresetsSerializationResult {
  const aggregator:PresetsSerializationResult = { result: [], warnings: [] };
  return infos
    .map(thunkSerializePreset(bundle))
    .reduce((result, presetSerializationResult) => {
      const results:any[] = [];
      const warnings:any[] = [];
      results.push.apply(result.result, presetSerializationResult.result);
      warnings.push.apply(result.warnings, presetSerializationResult.warnings);
      return result;
    }, aggregator);
}

function thunkSerializePreset(bundle:PresetsBundle):(info:ComponentPresetInfo) => PresetsSerializationResult {
  return ({ path }) => {
    try {
      const presetData:JSXSerializedElement = bundle[getUniqPresetImportName(path)];
      const { result: elements, warnings } = collectPresetElements(presetData, { result: {}, warnings: [] });
      return {
        result: [{
          elements,
          name: getPresetName(path),
          rootId: presetData.props.uxpId,
        }],
        warnings: warnings.map(thunkFillSourcePath(path)),
      };
    } catch (error) {
      return getResultForInvalidPreset(path, error);
    }
  };
}

function getResultForInvalidPreset(sourcePath:string, originalError:Error):PresetsSerializationResult {
  const warning:WarningDetails = {
    message: 'Cannot serialize component preset',
    originalError,
    sourcePath,
  };
  return { result: [], warnings: [warning] };
}
