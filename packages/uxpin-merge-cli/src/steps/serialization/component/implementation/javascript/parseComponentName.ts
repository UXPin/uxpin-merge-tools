import { ComponentDoc } from 'react-docgen-typescript/lib';
import { getComponentNameFromPath } from '../../name/getComponentNameFromPath';

export function parseComponentName(componentPath:string, parsed:ComponentDoc):string {
  return parsed.displayName || getComponentNameFromPath(componentPath);
}
