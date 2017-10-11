import { ComponentInfo } from '../../discovery/component/ComponentInfo';
import { ComponentPropertyDefinition } from './implementation/ComponentPropertyDefinition';

export interface ComponentMetadata {
  name:string;
  properties:ComponentPropertyDefinition[];
}

export interface ComponentDefinition extends ComponentInfo, ComponentMetadata {
}
