export interface ComponentPresetElement {
  name: string;
  props: ComponentPresetElementProps;
}

export interface ComponentPresetElementProps {
  [propName: string]: PresetElementPropValue;
}

export interface ComponentPresetData {
  rootId: string;
  elements: { [uxpinPresetElementId: string]: ComponentPresetElement };
}

export interface ComponentPreset {
  name: string;
  rootId: string;
  elements: { [id: string]: ComponentPresetElement };
}

export interface PresetElementReference {
  uxpinPresetElementId: string;
}

export type PresetElementPropValue = PresetElementReference | any | Array<PresetElementReference | any>;
