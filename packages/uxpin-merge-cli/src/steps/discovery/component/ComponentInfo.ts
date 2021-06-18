import { FrameworkNames } from '../../../framework/frameworkNames';

export interface ComponentInfo {
  dirPath:string;
  implementation:ComponentImplementationInfo;
  documentation?:ComponentDocumenationInfo;
  presets?:ComponentPresetInfo[];
}

export interface ComponentImplementationInfo {
  path:string;
  lang:ComponentImplementationLang;
  framework:ComponentImplementationFramework;
}

export type ComponentImplementationLang = 'javascript' | 'typescript';
export type ComponentImplementationFramework = FrameworkNames;

export interface ComponentDocumenationInfo {
  path:string;
}

export interface ComponentPresetInfo {
  path:string;
}
