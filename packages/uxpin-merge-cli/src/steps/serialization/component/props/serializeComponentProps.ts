import { PropDefinitionParsingResult } from '../implementation/PropDefinitionParsingResult';
import { PropDefinitionSerializationResult } from '../implementation/PropDefinitionSerializationResult';
import { ParsedPropertiesCollection } from './ParsedPropertiesCollection';

export function serializeComponentProps(props:PropDefinitionParsingResult[]):PropDefinitionSerializationResult[] {
  const collection:ParsedPropertiesCollection = new ParsedPropertiesCollection(props);
  return collection.serialize();
}
