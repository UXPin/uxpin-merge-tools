import debug from 'debug';
import { ComponentImplementationInfo, TypeScriptConfig } from '../../../discovery/component/ComponentInfo';
import { thunkGetSummaryResultForInvalidComponent } from './getSummaryResultForInvalidComponent';
import { ImplSerializationResult } from './ImplSerializationResult';
import { serializeJSComponent } from './javascript/serializeJSComponent';
import { serializeTSComponent } from './typescript/serializeTSComponent';

const log = debug('uxpin:serialization');

export function getComponentMetadata(
  component: ComponentImplementationInfo,
  config?: TypeScriptConfig
): Promise<ImplSerializationResult> {
  let promise: Promise<ImplSerializationResult>;
  if (component.lang === 'typescript') {
    log(`Serialize TS component`, component.path);
    promise = serializeTSComponent(component, config);
  } else {
    log(`Serialize JS component`, component.path);
    promise = serializeJSComponent(component);
  }
  return promise.catch(thunkGetSummaryResultForInvalidComponent(component.path));
}
