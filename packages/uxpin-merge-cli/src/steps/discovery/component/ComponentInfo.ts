export interface ComponentInfo {
  dirPath:string;
  implementation:ComponentImplementationInfo;
  documentation?:ComponentDocumenationInfo;
  presets?:ComponentPresetInfo[];
  stories?:ComponentPresetInfo[];
}

export interface ComponentImplementationInfo {
  path:string;
  lang:ComponentImplementationLang;
  framework:ComponentImplementationFramework;
}

export type ComponentImplementationLang = 'javascript' | 'typescript';
export type ComponentImplementationFramework = 'reactjs';

export interface ComponentDocumenationInfo {
  path:string;
}

export interface ComponentPresetInfo {
  path:string;
}
