import { ComponentImplementationInfo, TypeScriptConfig } from '../../../discovery/component/ComponentInfo';
import { thunkGetSummaryResultForInvalidComponent } from './getSummaryResultForInvalidComponent';
import { ImplSerializationResult } from './ImplSerializationResult';
import { serializeJSComponent } from './javascript/serializeJSComponent';
import { serializeTSComponent } from './typescript/serializeTSComponent';

export function getComponentMetadata(
  component: ComponentImplementationInfo,
  config?: TypeScriptConfig
): Promise<ImplSerializationResult> {
  let promise: Promise<ImplSerializationResult>;
  if (component.lang === 'typescript') {
    promise = serializeTSComponent(component, config);
  } else {
    promise = serializeJSComponent(component);
  }
  return promise.catch(thunkGetSummaryResultForInvalidComponent(component.path));
}
