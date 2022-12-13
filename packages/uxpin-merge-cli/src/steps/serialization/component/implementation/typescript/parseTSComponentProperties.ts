import * as ts from 'typescript';
import { getWarnedResult } from '../../../../../common/warning/getWarnedResult';
import { ParsedComponentProperty } from '../ComponentPropertyDefinition';
import { PropDefinitionParsingResult } from '../PropDefinitionParsingResult';
import { getComponentPropertiesDefinition } from './component/getComponentPropertiesDefinition';
import {
  ComponentDeclaration,
  DefaultProps,
  getPropsTypeAndDefaultProps,
} from './component/getPropsTypeAndDefaultProps';
import { TSSerializationContext } from './context/getSerializationContext';
import { getPropertiesFromType, TypeProps } from './property/type/getPropertiesFromType';

export function parseTSComponentProperties(
  context: TSSerializationContext,
  componentDeclaration: ComponentDeclaration
): PropDefinitionParsingResult[] {
  const { propsTypeNode, defaultProps } = getPropsTypeAndDefaultProps(context, componentDeclaration);
  if (!propsTypeNode) {
    throw new Error('No component properties found');
  }

  const typeFromTypeNode: ts.Type = context.checker.getTypeFromTypeNode(propsTypeNode);
  const props: TypeProps = getPropertiesFromType(typeFromTypeNode);

  return [
    ...getComponentPropertiesDefinition(context, props.baseProps, defaultProps),
    ...getComponentExclusivePropertiesDefinition(context, props.exclusiveProps, defaultProps),
  ];
}

function getComponentExclusivePropertiesDefinition(
  context: TSSerializationContext,
  props: ts.Symbol[],
  defaultProps: DefaultProps
): PropDefinitionParsingResult[] {
  return getComponentPropertiesDefinition(context, props, defaultProps).map(({ result, warnings }) => {
    const property: ParsedComponentProperty = {
      ...result,
      isRequired: false,
    };

    return getWarnedResult(property, warnings);
  });
}
