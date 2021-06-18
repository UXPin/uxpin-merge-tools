import { isArray, isObject, reduce } from 'lodash';
import { ComponentPresetElementProps } from '../../../../common/types/ComponentPreset';
import { getPresetElementReference } from './getPresetElementReference';
import { isJSXSerializedElement } from './isJSXSerializedElement';
import { PartialProps } from './jsx/JSXSerializationResult';

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
