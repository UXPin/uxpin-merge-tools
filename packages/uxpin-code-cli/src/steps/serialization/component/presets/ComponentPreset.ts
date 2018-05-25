export interface ComponentPresetElement {
  name:string;
  props:ComponentPresetElementProps;
}

export interface ComponentPresetElementProps {
  [propName:string]:PropertyValue;
}

export interface ComponentPresetData {
  rootId:string;
  elements:{ [uxpinPresetElementId:string]:ComponentPresetElement };
}

export interface ComponentPreset {
  name:string;
  rootId:string;
  elements:{ [id:string]:ComponentPresetElement };
}

export interface PresetElementReference {
  uxpinPresetElementId:string;
}

export type PropertyValue = PresetElementReference | any | Array<PresetElementReference | any>;
