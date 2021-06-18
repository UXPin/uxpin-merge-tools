import * as ts from 'typescript';
import { isDefined } from '../../../../../common/isDefined';
import { getWarnedResult } from '../../../../../common/warning/getWarnedResult';
import { PropDefinitionParsingResult } from '../../../../../steps/serialization/component/implementation/PropDefinitionParsingResult';
import { TSSerializationContext } from '../../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { parseTSComponentProperty } from '../property/parseTSComponentProperty';
import { DefaultProps } from './getPropsTypeAndDefaultProps';

export function getComponentPropertiesDefinition(
  context:TSSerializationContext,
  props:ts.Symbol[],
  defaultProps:DefaultProps,
):PropDefinitionParsingResult[] {
  return props
    .map((propSymbol:ts.Symbol) => parseTSComponentProperty(context, propSymbol, defaultProps))
    .filter(isDefined)
    .map((prop) => getWarnedResult(prop));
}
