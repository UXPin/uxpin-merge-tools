import { differenceBy, flatMap, uniq } from 'lodash';
import * as ts from 'typescript';

export interface TypeProps {
  baseProps:ts.Symbol[];
  exclusiveProps:ts.Symbol[];
}

const BLACKLIST_ATTRIBUTES:string[] = [
  'AriaAttributes',
  'DOMAttributes',
  'HTMLAttributes',
  'SVGAttributes',
];

export function getPropertiesFromType(type:ts.Type):TypeProps {
  if (type.isUnion()) {
    return getPropertiesFromUnionType(type);
  }

  return {
    baseProps: getBasePropertiesFromType(type),
    exclusiveProps: [],
  };
}

function getBasePropertiesFromType(type:ts.Type):ts.Symbol[] {
  return type.getProperties().filter((property, i) => {
    // @ts-ignore
    if (property.parent && BLACKLIST_ATTRIBUTES.includes(property.parent.escapedName)) {
      return false;
    }

    return true;
  });
}

function getPropertiesFromUnionType(type:ts.UnionType):TypeProps {
  const baseProps:ts.Symbol[] = getBasePropertiesFromType(type);
  const allProps:ts.Symbol[] = flatMap(type.types, (innerType) => innerType.getProperties());
  const exclusiveProps:ts.Symbol[] = uniq(differenceBy(allProps, baseProps, 'name'));

  return {
    baseProps,
    exclusiveProps,
  };
}
