import { flatMap } from 'lodash';
import { thunkFillSourcePath } from '../../../../common/warning/thunkFillSourcePath';
import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ComponentPresetInfo } from '../../../discovery/component/ComponentInfo';
import { ComponentPreset } from '../presets/ComponentPreset';
import { JSXSerializedElement } from '../presets/jsx/JSXSerializationResult';
import { PresetsSerializationResult } from '../presets/PresetsSerializationResult';
import { getUniqStorySetImportName } from './bundle/getUniqStoryImportName';
import { ComponentStories, ComponentStory, ComponentStorySet, StoriesBundle } from './bundle/StoriesBundle';
import { collectStoryElements } from './collectStoryElements';

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
      const story:ComponentStory = stories[exportName];
      const storyExecutionResult:JSXSerializedElement = story();
      const { result: serializedStory, warnings } = collectStoryElements(storyExecutionResult);
      const result:ComponentPreset[] = [];

      if (serializedStory) {
        result.push({
          name: exportName,
          ...serializedStory,
        });
      }

      return {
        result,
        warnings: warnings.map(thunkFillSourcePath(path)),
      };
    } catch (error) {
      return getResultForInvalidPreset(path, error);
    }
  };
}

function getResultForInvalidPreset(sourcePath:string, originalError:Error):PresetsSerializationResult {
  const warning:WarningDetails = {
    message: 'Cannot serialize stories',
    originalError,
    sourcePath,
  };
  return { result: [], warnings: [warning] };
}
