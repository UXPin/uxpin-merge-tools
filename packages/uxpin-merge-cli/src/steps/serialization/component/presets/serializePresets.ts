import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ProgramArgs } from '../../../../program/args/ProgramArgs';
import { ComponentPresetInfo } from '../../../discovery/component/ComponentInfo';
import { getPresetName } from '../../../discovery/component/presets/presetFileNameParser';
import { getUniqPresetImportName } from './jsx/bundle/getUniqPresetImportName';
import { compile } from './jsx/compile/compile';
import { JSXSerializedElement } from './jsx/JSXSerializationResult';
import { parsePresetData } from './parsePresetData';
import { PresetsSerializationResult } from './PresetsSerializationResult';

interface Presets {
  [importName:string]:JSXSerializedElement;
}

export async function serializePresets(
  programArgs:ProgramArgs,
  infos:ComponentPresetInfo[],
):Promise<PresetsSerializationResult> {
  const bundlePath:string = await compile(programArgs, infos);
  const bundle:Presets = require(bundlePath);

  const aggregator:PresetsSerializationResult = { result: [], warnings: [] };
  return infos
    .map(thunkSerializePreset(bundle))
    .reduce((result, presetSerializationResult) => {
      [].push.apply(result.result, presetSerializationResult.result);
      [].push.apply(result.warnings, presetSerializationResult.warnings);
      return result;
    }, aggregator);
}

function thunkSerializePreset(bundle:Presets):(info:ComponentPresetInfo) => PresetsSerializationResult {
  return ({ path }) => {
    try {
      const presetData:JSXSerializedElement = bundle[getUniqPresetImportName(path)];
      return {
        result: [{
          elements: parsePresetData(presetData, {}),
          name: getPresetName(path),
          rootId: presetData.props.key,
        }],
        warnings: [],
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
