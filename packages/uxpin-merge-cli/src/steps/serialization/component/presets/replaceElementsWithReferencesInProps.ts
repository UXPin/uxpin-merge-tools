import { isArray, isObject, reduce } from 'lodash';
import { ComponentPresetElementProps } from './ComponentPreset';
import { getPresetElementReference } from './getPresetElementReference';
import { isJSXSerializedElement } from './isJSXSerializedElement';
import { JSXSerializedElement, PartialProps } from './jsx/JSXSerializationResult';

export function replaceElementsWithReferencesInProps(props: PartialProps): ComponentPresetElementProps {
  return reduce<ComponentPresetElementProps, PartialProps>(
    props,
    (mappedProps, propValue, propName) => {
      if (isJSXSerializedElement(propValue)) {
        mappedProps[propName] = getPresetElementReference(propValue);
      } else {
        mappedProps[propName] = withoutUnsupportedElements(propValue);
      }
      return mappedProps;
    },
    {}
  );
}

function withoutUnsupportedElements(prop: ComponentPresetElementProps | any[] | any): ComponentPresetElementProps {
  if (!isArray(prop) && !isObject(prop)) {
    return prop;
  }

  return reduce(
    prop,
    (validProp, subProp, key) => {
      if (isJSXSerializedElement(subProp)) {
        // @ts-expect-error
        validProp[key] = makeParsableByUXPin(convertToJSX(subProp));
        return validProp;
      }

      if (isArray(validProp)) {
        // @ts-expect-error
        validProp.push(withoutUnsupportedElements(subProp));
      } else {
        validProp[key] = withoutUnsupportedElements(subProp);
      }

      return validProp;
    },
    isArray(prop) ? [] : ({} as ComponentPresetElementProps)
  );
}

function makeParsableByUXPin(jsx: string | null) {
  if (!jsx) {
    return null;
  }

  return `R$${jsx}$R`;
}

function convertToJSX(component: JSXSerializedElement | string): string | null {
  if (typeof component === 'string') {
    return component;
  }

  if (!component.name) {
    return null;
  }

  const processedChildren = component.children
    ? component.children.map((child) => convertToJSX(child)).filter(Boolean)
    : [];

  const propsString = Object.entries(component.props || {})
    .map(([key, value]) => {
      if (isJSXSerializedElement(value)) {
        return `${key}={${convertToJSX(value)}}`;
      }
      return `${key}={${JSON.stringify(value)}}`;
    })
    .join(' ');

  if (processedChildren.length === 0) {
    return `<${component.name}${propsString ? ' ' + propsString : ''} />`;
  }

  return `<${component.name}${propsString ? ' ' + propsString : ''}>${
    processedChildren.length > 0 ? processedChildren.join(' ') : ''
  }</${component.name}>`;
}
