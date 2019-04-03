import { ComponentImplementationInfo } from '../../../discovery/component/ComponentInfo';
import { ComponentSerializer } from '../../../discovery/config/CliConfig';
import { thunkGetSummaryResultForInvalidComponent } from './getSummaryResultForInvalidComponent';
import { ImplSerializationResult } from './ImplSerializationResult';
import { serializeJSComponent } from './javascript/serializeJSComponent';
import { serializeTSComponent } from './typescript/serializeTSComponent';

export function getComponentMetadata(
  component:ComponentImplementationInfo,
  serializationPlugin?:ComponentSerializer,
):Promise<ImplSerializationResult> {
  let promise:Promise<ImplSerializationResult>;

  if (serializationPlugin) {
    promise = serializationPlugin(component);
  } else if (component.lang === 'typescript') {
    promise = serializeTSComponent(component);
  } else {
    promise = serializeJSComponent(component);
  }

  return promise.catch(thunkGetSummaryResultForInvalidComponent(component.path));
}
