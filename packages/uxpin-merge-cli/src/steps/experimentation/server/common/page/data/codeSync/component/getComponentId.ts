import * as v5 from 'uuid/v5';
import { ComponentInfo } from '../../../../../../../discovery/component/ComponentInfo';

export function getComponentId(designSystemId: string, componentInfo: ComponentInfo): string {
  return v5(componentInfo.implementation.path, designSystemId);
}
