import { ComponentPropertyDefinition } from '../props/ComponentPropertyDefinition';

export interface ComponentDefinition {
  name:string;
  dirPath:string;
  implementation:ComponentImplementation;
  properties:ComponentPropertyDefinition[];
}

export interface ComponentImplementation {
  path:string;
}
