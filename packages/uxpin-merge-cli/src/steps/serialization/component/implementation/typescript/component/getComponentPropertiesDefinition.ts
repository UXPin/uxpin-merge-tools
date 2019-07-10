import * as ts from 'typescript';
import { PropDefinitionSerializationResult } from '../../PropDefinitionSerializationResult';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getPropertyDefinition } from '../property/getPropertyDefinition';
import { DefaultProps } from './getPropsTypeAndDefaultProps';

export function getComponentPropertiesDefinition(
  context:TSSerializationContext,
  props:ts.Symbol[],
  defaultProps:DefaultProps,
):PropDefinitionSerializationResult[] {
  return props
    .map((propSymbol:ts.Symbol) => getPropertyDefinition(context, propSymbol, defaultProps))
    .filter(isValidDefinition);
}

function isValidDefinition(
  definition:PropDefinitionSerializationResult | undefined,
):definition is PropDefinitionSerializationResult {
  return definition !== undefined;
}
