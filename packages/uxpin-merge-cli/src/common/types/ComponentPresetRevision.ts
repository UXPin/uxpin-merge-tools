import { ComponentPreset } from '../../steps/serialization/component/presets/ComponentPreset';

export interface ComponentPresetRevision extends ComponentPreset {
  /**
   * Constructed with `${revisionId}_${componentId}`
   */
  componentRevisionId:string;
  /**
   * Automatically generated unique string
   */
  presetId:string;
  sortIndex:number;
}
