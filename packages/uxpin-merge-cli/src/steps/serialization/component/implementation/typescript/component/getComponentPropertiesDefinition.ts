import * as ts from 'typescript';
import { getWarnedResult } from '../../../../../../common/warning/getWarnedResult';
import { ComponentPropertyDefinition } from '../../ComponentPropertyDefinition';
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
    .filter(isValidDefinition)
    .map((prop:ComponentPropertyDefinition) => getWarnedResult(prop));
}

function isValidDefinition(
  definition:ComponentPropertyDefinition | undefined,
):definition is ComponentPropertyDefinition {
  return definition !== undefined;
}
