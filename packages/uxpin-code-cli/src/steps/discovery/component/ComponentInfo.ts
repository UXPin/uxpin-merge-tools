export interface ComponentInfo {
  dirPath:string;
  name:string;
  implementation:ComponentImplementationInfo;
  documentation?:ComponentDocumenationInfo;
}

export interface ComponentImplementationInfo {
  path:string;
  lang:ComponentImplementationLang;
  framework:ComponentImplementationFramework;
}

type ComponentImplementationLang = 'javascript' | 'typescript';
type ComponentImplementationFramework = 'reactjs';

export interface ComponentDocumenationInfo {
  path:string;
}
