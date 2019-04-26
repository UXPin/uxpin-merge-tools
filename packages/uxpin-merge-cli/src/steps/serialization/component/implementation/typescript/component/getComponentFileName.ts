import { parse } from 'path';
import { TSSerializationContext } from '../context/getSerializationContext';

export function getComponentFileName(context:TSSerializationContext):string {
  const componentName:string = parse(context.componentPath).name;

  return componentName;
}
