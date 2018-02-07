export interface ComponentInfo {
  dirPath:string;
  implementation:ComponentImplementationInfo;
  documentation?:ComponentDocumenationInfo;
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
