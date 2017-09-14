import { extname } from 'path';
import { serializeJSComponentProps } from './javascript/serializeJSComponentProps';
import { PropsSerializationResult } from './PropsSerializationResult';
import { serializeTSComponentProps } from './typescript/serializeTSComponentProps';

export function serializeComponentProps(componentFileLocation:string):Promise<PropsSerializationResult> {
  const TYPESCRIPT_COMPONENT_EXTENSION:string = '.tsx';
  const extension:string = extname(componentFileLocation);
  if (extension === TYPESCRIPT_COMPONENT_EXTENSION) {
    return serializeTSComponentProps(componentFileLocation);
  }
  return serializeJSComponentProps(componentFileLocation);
}
