import * as ts from 'typescript';
import { getWarnedResult } from '../../../../common/warning/getWarnedResult';
import { ParsedComponentProperty } from '../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { PropDefinitionParsingResult } from '../../../../steps/serialization/component/implementation/PropDefinitionParsingResult';
import { ComponentDeclaration } from '../../../../steps/serialization/component/implementation/typescript/component/getPropsTypeAndDefaultProps';
import { TSSerializationContext } from '../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { getPropertiesFromType, TypeProps } from '../../../../steps/serialization/component/implementation/typescript/property/type/getPropertiesFromType';
import { getComponentPropertiesDefinition } from './component/getComponentPropertiesDefinition';
import {
  DefaultProps,
  getPropsTypeAndDefaultProps,
} from './component/getPropsTypeAndDefaultProps';

export function parseTSComponentProperties(
  context:TSSerializationContext,
  componentDeclaration:ComponentDeclaration,
):PropDefinitionParsingResult[] {
  const { propsTypeNode, defaultProps } = getPropsTypeAndDefaultProps(context, componentDeclaration);
  if (!propsTypeNode) {
    throw new Error('No component properties found');
  }

  const typeFromTypeNode:ts.Type = context.checker.getTypeFromTypeNode(propsTypeNode);
  const props:TypeProps = getPropertiesFromType(typeFromTypeNode);

  return [
    ...getComponentPropertiesDefinition(context, props.baseProps, defaultProps),
    ...getComponentExclusivePropertiesDefinition(context, props.exclusiveProps, defaultProps),
  ];
}

function getComponentExclusivePropertiesDefinition(
  context:TSSerializationContext,
  props:ts.Symbol[],
  defaultProps:DefaultProps,
):PropDefinitionParsingResult[] {
  return getComponentPropertiesDefinition(context, props, defaultProps)
    .map(({ result, warnings }) => {
      const property:ParsedComponentProperty = {
        ...result,
        isRequired: false,
      };

      return getWarnedResult(property, warnings);
    });
}
