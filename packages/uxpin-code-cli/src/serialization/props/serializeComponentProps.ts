import { extname } from 'path';
import { getSummaryResultForInvalidComponent } from './getSummaryResultForInvalidComponent';
import { serializeJSComponentProps } from './javascript/serializeJSComponentProps';
import { PropsSerializationResult } from './PropsSerializationResult';
import { serializeTSComponentProps } from './typescript/serializeTSComponentProps';

export function serializeComponentProps(componentFileLocation:string):Promise<PropsSerializationResult> {
  const TYPESCRIPT_COMPONENT_EXTENSION:string = '.tsx';
  const extension:string = extname(componentFileLocation);
  let promise:Promise<PropsSerializationResult>;
  if (extension === TYPESCRIPT_COMPONENT_EXTENSION) {
    promise = serializeTSComponentProps(componentFileLocation);
  } else {
    promise = serializeJSComponentProps(componentFileLocation);
  }
  return promise.catch(getSummaryResultForInvalidComponent(componentFileLocation));
}
