import { validateProps } from '../../validation/validateProps';
import { PropDefinitionParsingResult } from '../implementation/PropDefinitionParsingResult';
import { PropDefinitionSerializationResult } from '../implementation/PropDefinitionSerializationResult';
import { serializeComponentProps } from './serializeComponentProps';

export function serializeAndValidateParsedProperties(
  props:PropDefinitionParsingResult[],
):PropDefinitionSerializationResult[] {
  const serializedProps:PropDefinitionSerializationResult[] = serializeComponentProps(props);
  return validateProps(serializedProps);
}
