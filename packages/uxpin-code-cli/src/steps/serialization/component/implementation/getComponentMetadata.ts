import { extname } from 'path';
import { getSummaryResultForInvalidComponent } from './getSummaryResultForInvalidComponent';
import { ImplSerializationResult } from './ImplSerializationResult';
import { serializeJSComponent } from './javascript/serializeJSComponent';
import { serializeTSComponent } from './typescript/serializeTSComponentProps';

export function getComponentMetadata(componentFileLocation:string):Promise<ImplSerializationResult> {
  const TYPESCRIPT_COMPONENT_EXTENSION:string = '.tsx';
  const extension:string = extname(componentFileLocation);
  let promise:Promise<ImplSerializationResult>;
  if (extension === TYPESCRIPT_COMPONENT_EXTENSION) {
    promise = serializeTSComponent(componentFileLocation);
  } else {
    promise = serializeJSComponent(componentFileLocation);
  }
  return promise.catch(getSummaryResultForInvalidComponent(componentFileLocation));
}
