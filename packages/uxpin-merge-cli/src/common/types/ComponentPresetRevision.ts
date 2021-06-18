import { ComponentPreset } from './ComponentPreset';

export interface ComponentPresetRevision extends ComponentPreset {
  componentRevisionId:string;
  presetId:string;
  sortIndex:number;
}
