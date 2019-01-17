import { forEach, isArray, isEmpty, isObject, reduce } from 'lodash';
import { ComponentPresetElement, ComponentPresetElementProps, PresetElementReference } from './ComponentPreset';
import {
  AnySerializedElement,
  JSXSerializedElement,
  JSXSerializedElementProp,
  JSXSerializedElementProps,
} from './jsx/JSXSerializationResult';

interface MapChildrenResult {
  children?:Array<PresetElementReference | string> | string;
}

interface PresetElementsMap {
  [id:string]:ComponentPresetElement;
}

type PartialProps = Pick<JSXSerializedElementProps, Exclude<keyof JSXSerializedElementProps, 'uxpId'>>;

export function getPresetElementsMap(element:AnySerializedElement, elements:PresetElementsMap):PresetElementsMap {
  if (!isJSXSerializedElement(element)) {
    return elements;
  }

  const { children, name, props: { uxpId, ...props } } = element;
  elements[uxpId] = {
    name,
    props: {
      ...replaceElementsWithReferencesInProps(props),
      ...replaceElementsWithReferencesInChildren(element),
    },
  };

  if (isArray(children)) {
    forEach(children, (child) => getPresetElementsMap(child, elements));
  }
  forEach(props, (prop) => isJSXSerializedElement(prop) && getPresetElementsMap(prop, elements));

  return elements;
}

function replaceElementsWithReferencesInProps(props:PartialProps):ComponentPresetElementProps {
  return reduce<ComponentPresetElementProps, PartialProps>(props, (mappedProps, propValue, propName) => {
    if (isJSXSerializedElement(propValue)) {
      mappedProps[propName] = getPresetElementReference(propValue);
    } else {
      mappedProps[propName] = propValue;
    }
    return mappedProps;
  }, {});
}

function replaceElementsWithReferencesInChildren(element:AnySerializedElement):MapChildrenResult {
  if (!isJSXSerializedElement(element) || !isArray(element.children) || isEmpty(element.children)) {
    return {};
  }

  const { children } = element;
  if (children.length === 1 && typeof children[0] === 'string') {
    return { children: children[0] as string };
  }
  return {
    children: children.map(getPresetElementReference),
  };
}

function getPresetElementReference(child:AnySerializedElement):PresetElementReference | string {
  if (isJSXSerializedElement(child)) {
    const { props: { uxpId } } = child;
    return { uxpinPresetElementId: uxpId };
  }

  return child;
}

function isJSXSerializedElement(elem:AnySerializedElement | JSXSerializedElementProp):elem is JSXSerializedElement {
  return isObject(elem) && elem.uxpinPresetElementType === 'CodeComponent';
}
