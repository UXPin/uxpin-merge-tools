import { ComponentInfo } from '../../discovery/components/ComponentInfo';
import { ComponentPropertyDefinition } from '../props/ComponentPropertyDefinition';

export interface ComponentDefinition extends ComponentInfo {
  properties:ComponentPropertyDefinition[];
}
