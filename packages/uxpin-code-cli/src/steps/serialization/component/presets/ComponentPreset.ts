export interface ComponentPresetElement {
  type:string;
  props:ComponentPresetElementProps;
}

export interface ComponentPresetElementProps {
  [propName:string]:any;
}

export interface ComponentPresetData {
  rootId:string;
  elements:{[id:string]:ComponentPresetElement};
}

export interface ComponentPreset {
  name:string;
  rootId:string;
  elements:{[id:string]:ComponentPresetElement};
}
