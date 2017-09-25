import { ComponentInfo } from '../../components/ComponentInfo';
import { ComponentPropertyDefinition } from '../props/ComponentPropertyDefinition';

export interface ComponentDefinition extends ComponentInfo {
  properties:ComponentPropertyDefinition[];
}
