import { ComponentInfo } from '../../discovery/component/ComponentInfo';
import { ComponentExample } from './examples/ComponentExample';
import { ComponentPropertyDefinition } from './properties/ComponentPropertyDefinition';

export interface ComponentDefinition extends ComponentInfo {
  properties:ComponentPropertyDefinition[];
  examples:ComponentExample[];
}
