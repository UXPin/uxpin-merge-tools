import { isArray, isObject, reduce } from 'lodash';
import { ComponentPresetElementProps } from './ComponentPreset';
import { getPresetElementReference } from './getPresetElementReference';
import { isJSXSerializedElement } from './isJSXSerializedElement';
import { JSXSerializedElementProps } from './jsx/JSXSerializationResult';

export type PartialProps = Pick<JSXSerializedElementProps, Exclude<keyof JSXSerializedElementProps, 'uxpId'>>;

export function replaceElementsWithReferencesInProps(props:PartialProps):ComponentPresetElementProps {
  return reduce<ComponentPresetElementProps, PartialProps>(props, (mappedProps, propValue, propName) => {
    if (isJSXSerializedElement(propValue)) {
      mappedProps[propName] = getPresetElementReference(propValue);
    } else {
      mappedProps[propName] = withoutUnsupportedElements(propValue);
    }
    return mappedProps;
  }, {});
}

function withoutUnsupportedElements(prop:ComponentPresetElementProps | any[] | any):ComponentPresetElementProps {
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
