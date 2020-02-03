import { isArray, isObject, reduce } from 'lodash';
import { ComponentPresetElementProps } from './ComponentPreset';
import { isJSXSerializedElement } from './isJSXSerializedElement';

export function withoutUnsupportedElements(prop:ComponentPresetElementProps | any[] | any):ComponentPresetElementProps {
  if (!isArray(prop) && !isObject(prop)) {
    return prop;
  }

  return reduce(prop, (validProp, subProp, key) => {
    if (isJSXSerializedElement(subProp)) {
      return validProp;
    }

    if (isArray(validProp)) {
      validProp.push(withoutUnsupportedElements(subProp));
    } else {
      validProp[key] = withoutUnsupportedElements(subProp);
    }

    return validProp;
  }, isArray(prop) ? [] : {} as ComponentPresetElementProps);
}
