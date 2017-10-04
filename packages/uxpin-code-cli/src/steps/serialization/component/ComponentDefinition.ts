import { ComponentInfo } from '../../discovery/component/ComponentInfo';
import { ComponentPropertyDefinition } from './properties/ComponentPropertyDefinition';

export interface ComponentDefinition extends ComponentInfo {
  properties:ComponentPropertyDefinition[];
}
