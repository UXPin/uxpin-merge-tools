import { isArray, isEmpty } from 'lodash';
import { PresetElementReference } from './ComponentPreset';
import { getPresetElementReference } from './getPresetElementReference';
import { isJSXSerializedElement } from './isJSXSerializedElement';
import { AnySerializedElement } from './jsx/JSXSerializationResult';

interface MapChildrenResult {
  children?:Array<PresetElementReference | string> | string;
}

export function replaceElementsWithReferencesInChildren(element:AnySerializedElement):MapChildrenResult {
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
