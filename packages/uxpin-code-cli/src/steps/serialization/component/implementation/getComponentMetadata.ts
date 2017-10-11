import { extname } from 'path';
import { getSummaryResultForInvalidComponent } from './getSummaryResultForInvalidComponent';
import { serializeJSComponent } from './javascript/serializeJSComponent';
import { ImplSerializationResult } from './ImplSerializationResult';
import { serializeTSComponentProps } from './typescript/serializeTSComponentProps';

export function getComponentMetadata(componentFileLocation:string):Promise<ImplSerializationResult> {
  const TYPESCRIPT_COMPONENT_EXTENSION:string = '.tsx';
  const extension:string = extname(componentFileLocation);
  let promise:Promise<ImplSerializationResult>;
  if (extension === TYPESCRIPT_COMPONENT_EXTENSION) {
    promise = serializeTSComponentProps(componentFileLocation);
  } else {
    promise = serializeJSComponent(componentFileLocation);
  }
  return promise.catch(getSummaryResultForInvalidComponent(componentFileLocation));
}
