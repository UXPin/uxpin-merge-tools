import * as ts from 'typescript';

export interface ComponentInfo {
  dirPath: string;
  implementation: ComponentImplementationInfo;
  documentation?: ComponentDocumenationInfo;
  presets?: ComponentPresetInfo[];
}

export interface ComponentImplementationInfo {
  path: string;
  lang: ComponentImplementationLang;
  framework: ComponentImplementationFramework;
}

export type ComponentImplementationLang = 'javascript' | 'typescript';
export type ComponentImplementationFramework = 'reactjs';

export interface ComponentDocumenationInfo {
  path: string;
}

export interface ComponentPresetInfo {
  path: string;
}

export interface TypeScriptConfig {
  compilerOptions: ts.CompilerOptions;
}
