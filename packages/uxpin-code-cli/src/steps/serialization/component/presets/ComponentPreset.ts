interface ComponentPresetProps {
  [propName:string]:any;
}

export interface ComponentPresetData {
  rootId:string;
  elements:{[id:string]:ComponentPresetProps};
}

export interface ComponentPreset {
  name:string;
  rootId:string;
  elements:{[id:string]:ComponentPresetProps};
}
