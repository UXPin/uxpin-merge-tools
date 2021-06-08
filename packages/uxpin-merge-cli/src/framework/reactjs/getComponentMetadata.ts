import { ComponentImplementationInfo } from '../../steps/discovery/component/ComponentInfo';
import { thunkGetSummaryResultForInvalidComponent } from '../../steps/serialization/component/implementation/getSummaryResultForInvalidComponent';
import { ImplSerializationResult } from '../../steps/serialization/component/implementation/ImplSerializationResult';
import { serializeJSComponent } from './serialization/javascript/serializeJSComponent';
import { serializeTSComponent } from './serialization/typescript/serializeTSComponent';

export function getComponentMetadata(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  let promise:Promise<ImplSerializationResult>;
  if (component.lang === 'typescript') {
    promise = serializeTSComponent(component);
  } else {
    promise = serializeJSComponent(component);
  }
  return promise.catch(thunkGetSummaryResultForInvalidComponent(component.path));
}
