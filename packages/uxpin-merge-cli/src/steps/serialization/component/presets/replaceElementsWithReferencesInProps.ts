import { forEachRight, isArray, isObject, reduce } from 'lodash';
import { ComponentPresetElementProps } from './ComponentPreset';
import { getPresetElementReference } from './getPresetElementReference';
import { isJSXSerializedElement } from './isJSXSerializedElement';
import { JSXSerializedElementProps } from './jsx/JSXSerializationResult';

type PartialProps = Pick<JSXSerializedElementProps, Exclude<keyof JSXSerializedElementProps, 'uxpId'>>;

export function replaceElementsWithReferencesInProps(props:PartialProps):ComponentPresetElementProps {
  return reduce<ComponentPresetElementProps, PartialProps>(props, (mappedProps, propValue, propName) => {
    if (isJSXSerializedElement(propValue)) {
      mappedProps[propName] = getPresetElementReference(propValue);
    } else {
      mappedProps[propName] = propValue;
      removeUnsupportedElements(propValue);
    }
    return mappedProps;
  }, {});
}

function removeUnsupportedElements(prop:ComponentPresetElementProps | any):void {
  if (isArray(prop) || isObject(prop)) {
    forEachRight(prop, (subProp, key) => {
      if (isJSXSerializedElement(subProp)) {
        if (isArray(prop)) {
          prop.splice(key, 1);
        } else {
          delete prop[key];
        }
      } else {
        removeUnsupportedElements(subProp);
      }
    });
  }
}
