import { ComponentImplementationInfo } from '../../../discovery/component/ComponentInfo';
import { getSummaryResultForInvalidComponent } from './getSummaryResultForInvalidComponent';
import { ImplSerializationResult } from './ImplSerializationResult';
import { serializeJSComponent } from './javascript/serializeJSComponent';
import { serializeTSComponent } from './typescript/serializeTSComponent';

export function getComponentMetadata(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  let promise:Promise<ImplSerializationResult>;
  if (component.lang === 'typescript') {
    promise = serializeTSComponent(component);
  } else {
    promise = serializeJSComponent(component);
  }
  return promise.catch(getSummaryResultForInvalidComponent(component.path));
}
