import { flatMap } from 'lodash';
import { thunkFillSourcePath } from '../../../../common/warning/thunkFillSourcePath';
import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ComponentPresetInfo } from '../../../discovery/component/ComponentInfo';
import { collectPresetElements } from '../presets/collectPresetElements';
import { JSXSerializedElement } from '../presets/jsx/JSXSerializationResult';
import { PresetsSerializationResult } from '../presets/PresetsSerializationResult';
import { getUniqStorySetImportName } from './bundle/getUniqStoryImportName';
import { ComponentStories, ComponentStorySet, StoriesBundle } from './bundle/StoriesBundle';

export function serializeStories(bundle:StoriesBundle, stories:ComponentPresetInfo[]):PresetsSerializationResult {
  const aggregator:PresetsSerializationResult = { result: [], warnings: [] };
  return flatMap(stories, thunkSerializeStoriesSet(bundle))
    .reduce((result, presetSerializationResult) => {
      [].push.apply(result.result, presetSerializationResult.result);
      [].push.apply(result.warnings, presetSerializationResult.warnings);
      return result;
    }, aggregator);
}

function thunkSerializeStoriesSet(bundle:StoriesBundle):(info:ComponentPresetInfo) => PresetsSerializationResult[] {
  return ({ path }) => {
    const { default: metadata, ...storySet }:ComponentStorySet = bundle[getUniqStorySetImportName(path)];
    return Object.keys(storySet).map(thunkSerializeStory(path, storySet));
  };
}

function thunkSerializeStory(
  path:string,
  stories:ComponentStories,
):(exportName:string) => PresetsSerializationResult {
  return (exportName) => {
    try {
      const presetData:JSXSerializedElement = stories[exportName] as JSXSerializedElement;
      const { result: elements, warnings } = collectPresetElements(presetData, { result: {}, warnings: [] });
      return {
        result: [{
          elements,
          name: exportName,
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
