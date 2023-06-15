import { reduce, tail, head } from 'lodash';
import * as ts from 'typescript';
import { ParsedComponentProperty, PropertyType } from '../../ComponentPropertyDefinition';
import { DefaultProps } from '../component/getPropsTypeAndDefaultProps';
import { TSSerializationContext } from '../context/getSerializationContext';
import { convertMethodSignatureSymbolToPropertyDefinition } from './symbol/convertMethodSignatureSymbolToPropertyDefinition';
import { convertPropertySignatureSymbolToPropertyDefinition } from './symbol/convertPropertySignatureSymbolToPropertyDefinition';
import { getValidSymbols } from './symbol/getValidSymbol';
import { isMethodSignatureSymbol } from './symbol/isMethodSignatureSymbol';
import { isPropertySignatureSymbol, PropertySymbol } from './symbol/isPropertySignatureSymbol';
import { forEach } from 'lodash';

function everyTypesAreValidAndTheSame(propertyDefinitions: ParsedComponentProperty[]) {
  const ignoredTypes = ['any', 'unsupported'];
  return (
    propertyDefinitions.length &&
    propertyDefinitions.every(
      (propertyDefinition) =>
        propertyDefinition?.type?.name &&
        !ignoredTypes.includes(propertyDefinition?.type?.name) &&
        propertyDefinition?.type?.name === propertyDefinitions[0]?.type?.name
    )
  );
}

function hasUnionType(propertyDefinitions: ParsedComponentProperty[]) {
  return propertyDefinitions.some((propertyDefinition) => propertyDefinition?.type?.name === 'union');
}

function getPropertyDefinitions(
  propertySymbols: ts.Symbol[],
  context: TSSerializationContext,
  defaultProps: DefaultProps
) {
  const propertyDefinitions: ParsedComponentProperty[] = [];
  forEach(propertySymbols, (propertySymbol) => {
    if (isPropertySignatureSymbol(propertySymbol)) {
      propertyDefinitions.push(propertySignatureToPropertyDefinition(context, propertySymbol, defaultProps));
    }

    if (isMethodSignatureSymbol(propertySymbol)) {
      propertyDefinitions.push(convertMethodSignatureSymbolToPropertyDefinition(context, propertySymbol));
    }
  });

  return propertyDefinitions;
}

function decorateUnionTypesIfPossible(
  propertySymbols: ts.Symbol[],
  context: TSSerializationContext,
  defaultProps: DefaultProps
) {
  const propertyDefinitions = getPropertyDefinitions(propertySymbols, context, defaultProps);
  const unionType: PropertyType<'union'> = {
    name: 'union',
    structure: { elements: [] },
  };

  if (hasUnionType(propertyDefinitions)) {
    forEach(propertyDefinitions, (propertyDefinition) => {
      if (propertyDefinition.type?.name === 'union') {
        unionType.structure.elements.push(...(propertyDefinition.type as PropertyType<'union'>).structure.elements);
      } else if (propertyDefinition.type) {
        unionType.structure.elements.push(propertyDefinition.type);
      }
    });

    head(propertyDefinitions)!.type = unionType;
  } else if (everyTypesAreValidAndTheSame(propertyDefinitions)) {
    forEach(propertyDefinitions, (propertyDefinition) => {
      if (propertyDefinition.type) {
        unionType.structure.elements.push(propertyDefinition.type);
      }
    });

    head(propertyDefinitions)!.type = unionType;
  }

  return head(propertyDefinitions)!;
}

export function parseTSComponentProperty(
  context: TSSerializationContext,
  property: ts.Symbol,
  defaultProps: DefaultProps
): ParsedComponentProperty | undefined {
  try {
    const propertySymbols: ts.Symbol[] = getValidSymbols(property);
    if (!propertySymbols.length) {
      return;
    }

    /**
     * For this case
     *
     * type IconProps = {
     *  icon: "icon";
     * };
     *
     * type OtherProps = {
     *  icon?: "disc" | "circle" | "square" | "number";
     * };
     *
     * type Props = IconProps | OtherProps
     *
     * merge-cli returned only first symbol and user wasn't able to select
     * "disc", "circle", "square", "number" options
     * this fix introduces support for more than one symbols.
     * At this moment I handle the easiest case.
     * I decorated union type when one of type is union or every symbol has the same type different than any or unsupported
     */
    if (propertySymbols.length > 1) {
      return decorateUnionTypesIfPossible(propertySymbols, context, defaultProps);
    } else {
      const propertySymbol = propertySymbols[0];
      if (isPropertySignatureSymbol(propertySymbol)) {
        return propertySignatureToPropertyDefinition(context, propertySymbol, defaultProps);
      }

      if (isMethodSignatureSymbol(propertySymbol)) {
        return convertMethodSignatureSymbolToPropertyDefinition(context, propertySymbol);
      }
    }
  } catch (e) {
    return;
  }
}

function propertySignatureToPropertyDefinition(
  context: TSSerializationContext,
  propSymbol: PropertySymbol,
  defaultProps: DefaultProps
): ParsedComponentProperty {
  const prop: ParsedComponentProperty = convertPropertySignatureSymbolToPropertyDefinition(context, propSymbol);
  if (prop.name in defaultProps) {
    prop.defaultValue = { value: defaultProps[prop.name] };
  }

  return prop;
}
