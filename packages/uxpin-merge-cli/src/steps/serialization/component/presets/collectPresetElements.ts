import { forEach, isArray } from 'lodash';
import { Warned } from '../../../../common/warning/Warned';
import { ComponentPresetElement } from './ComponentPreset';
import { isJSXSerializedElement } from './isJSXSerializedElement';
import { AnySerializedElement } from './jsx/JSXSerializationResult';
import { replaceElementsWithReferencesInChildren } from './replaceElementsWithReferencesInChildren';
import { replaceElementsWithReferencesInProps } from './replaceElementsWithReferencesInProps';

export interface PresetElementsMap {
  [id:string]:ComponentPresetElement;
}

export function collectPresetElements(
  element:AnySerializedElement,
  elementsCollector:Warned<PresetElementsMap>,
):Warned<PresetElementsMap> {
  if (!isJSXSerializedElement(element)) {
    return elementsCollector;
  }

  const { children, name, props: { uxpId, ...props } } = element;

  if (!uxpId) {
    throw new Error('Missing `uxpId` property');
  }

  elementsCollector.result[uxpId] = {
    name,
    props: {
      ...replaceElementsWithReferencesInProps(props),
      ...replaceElementsWithReferencesInChildren(element),
    },
  };

  elementsCollector.warnings.push(...element.warnings);

  if (isArray(children)) {
    forEach(children, (child) => collectPresetElements(child, elementsCollector));
  }

  forEach(props, (prop) => collectPresetElements(prop, elementsCollector));

  return elementsCollector;
}
