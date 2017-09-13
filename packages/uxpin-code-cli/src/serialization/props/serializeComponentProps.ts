import { extname } from 'path';
import { ComponentPropsList } from './ComponentPropsList';
import { serializeJSComponentProps } from './javascript/serializeJSComponentProps';
import { serializeTSComponentProps } from './typescript/serializeTSComponentProps';

export function serializeComponentProps(componentFileLocation:string):Promise<ComponentPropsList> {
  const TYPESCRIPT_COMPONENT_EXTENSION:string = '.tsx';
  const extension:string = extname(componentFileLocation);
  if (extension === TYPESCRIPT_COMPONENT_EXTENSION) {
    return serializeTSComponentProps(componentFileLocation);
  }
  return serializeJSComponentProps(componentFileLocation);
}
