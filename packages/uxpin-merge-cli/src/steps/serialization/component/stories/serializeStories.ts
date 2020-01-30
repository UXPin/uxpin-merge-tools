import { ComponentPresetInfo } from '../../../discovery/component/ComponentInfo';
import { PresetsBundle } from '../presets/jsx/bundle/PresetsBundle';
import { PresetsSerializationResult } from '../presets/PresetsSerializationResult';

export function serializeStories(bundle:PresetsBundle, stories:ComponentPresetInfo[]):PresetsSerializationResult {
  return { result: [], warnings: [] };
}
