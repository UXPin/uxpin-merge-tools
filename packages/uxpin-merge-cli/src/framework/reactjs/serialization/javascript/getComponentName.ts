import { ComponentDoc } from 'react-docgen-typescript/lib';
import { getComponentNameFromPath } from '../../../../steps/serialization/component/name/getComponentNameFromPath';

export function getComponentName(componentPath:string, parsed:ComponentDoc):string {
  return parsed.displayName || getComponentNameFromPath(componentPath);
}
