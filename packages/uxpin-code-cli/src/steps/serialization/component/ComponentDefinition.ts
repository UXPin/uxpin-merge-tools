import { ComponentInfo } from '../../discovery/components/ComponentInfo';
import { ComponentPropertyDefinition } from './properties/ComponentPropertyDefinition';

export interface ComponentDefinition extends ComponentInfo {
  properties:ComponentPropertyDefinition[];
}
