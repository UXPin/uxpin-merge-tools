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

export function getPresetElementsMap(
  element:AnySerializedElement,
  elements:Warned<PresetElementsMap>,
):Warned<PresetElementsMap> {
  if (!isJSXSerializedElement(element)) {
    return elements;
  }

  const { children, name, props: { uxpId, ...props } } = element;
  elements.result[uxpId] = {
    name,
    props: {
      ...replaceElementsWithReferencesInProps(props),
      ...replaceElementsWithReferencesInChildren(element),
    },
  };

  elements.warnings.push(...element.warnings);

  if (isArray(children)) {
    forEach(children, (child) => getPresetElementsMap(child, elements));
  }
  forEach(props, (prop) => isJSXSerializedElement(prop) && getPresetElementsMap(prop, elements));

  return elements;
}
