import { ComponentPreset } from '../../steps/serialization/component/presets/ComponentPreset';

export interface ComponentPresetRevision extends ComponentPreset {
  componentRevisionId:string;
  presetId:string;
  sortIndex:number;
}
