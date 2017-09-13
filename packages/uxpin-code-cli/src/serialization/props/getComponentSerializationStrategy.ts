import { extname } from 'path';
import { ComponentPropsList } from './ComponentPropsList';
import { serializeJSComponentProps } from './javascript/serializeJSComponentProps';
import { serializeTSComponentProps } from './typescript/serializeTSComponentProps';

type SerializationStrategy = (componentFileLocation:string) => Promise<ComponentPropsList>;

export function getComponentSerializationStrategy(componentLocation:string):SerializationStrategy {
  const TYPESCRIPT_COMPONENT_EXTENSION:string = 'tsx';
  if (extname(componentLocation) === TYPESCRIPT_COMPONENT_EXTENSION) {
    return serializeTSComponentProps;
  }
  return serializeJSComponentProps;
}
