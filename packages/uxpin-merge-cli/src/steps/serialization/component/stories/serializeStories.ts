import { flatMap, isFunction } from 'lodash';
import { thunkFillSourcePath } from '../../../../common/warning/thunkFillSourcePath';
import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ComponentInfoWithName, ComponentPresetInfo } from '../../../discovery/component/ComponentInfo';
import { JSXSerializedElement } from '../presets/jsx/JSXSerializationResult';
import { PresetsSerializationResult } from '../presets/PresetsSerializationResult';
import { getUniqStorySetImportName } from './bundle/getUniqStoryImportName';
import { ComponentStories, ComponentStory, ComponentStorySet, StoriesBundle } from './bundle/StoriesBundle';
import { collectStoryElements } from './collectStoryElements';

export function serializeStories(bundle:StoriesBundle, info:ComponentInfoWithName):PresetsSerializationResult {
  const { stories, name } = info;
  const aggregator:PresetsSerializationResult = { result: [], warnings: [] };
  return flatMap(stories, thunkSerializeStoriesSet(bundle, name))
    .reduce((result, presetSerializationResult) => {
      [].push.apply(result.result, presetSerializationResult.result);
      [].push.apply(result.warnings, presetSerializationResult.warnings);
      return result;
    }, aggregator);
}

function thunkSerializeStoriesSet(
  bundle:StoriesBundle,
  componentName:string,
):(info:ComponentPresetInfo) => PresetsSerializationResult[] {
  return ({ path }) => {
    const { default: metadata, ...storySet }:ComponentStorySet = bundle[getUniqStorySetImportName(path)];
    return Object.keys(storySet).map(thunkSerializeStory(path, storySet, componentName));
  };
}

function thunkSerializeStory(
  path:string,
  stories:ComponentStories,
  componentName:string,
):(exportName:string) => PresetsSerializationResult {
  return (exportName) => {
    try {
      const emptySerializationResult:PresetsSerializationResult = { result: [], warnings: [] };
      const story:ComponentStory = stories[exportName];
      if (!isFunction(story)) {
        return emptySerializationResult;
      }

      const storyExecutionResult:JSXSerializedElement = story();
      const { result: serializedStory, warnings } = collectStoryElements(storyExecutionResult, componentName);

      if (!serializedStory) {
        return emptySerializationResult;
      }

      return {
        result: [{
          name: exportName,
          ...serializedStory,
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
    message: 'Cannot serialize stories',
    originalError,
    sourcePath,
  };
  return { result: [], warnings: [warning] };
}
