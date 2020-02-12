import * as v5 from 'uuid/v5';
import { ComponentDefinition } from '../../../../../../../serialization/component/ComponentDefinition';
import { ComponentPreset } from '../../../../../../../serialization/component/presets/ComponentPreset';

export function getPresetId(designSystemId:string, component:ComponentDefinition, preset:ComponentPreset):string {
  return v5(`Component:${component.name}_Preset:${preset.name}`, designSystemId);
}
