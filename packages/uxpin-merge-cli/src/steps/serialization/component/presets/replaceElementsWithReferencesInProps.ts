import { isArray, isObject, reduce } from 'lodash';
import { ComponentPresetElementProps } from './ComponentPreset';
import { getPresetElementReference } from './getPresetElementReference';
import { isJSXSerializedElement } from './isJSXSerializedElement';
import { PartialProps } from './jsx/JSXSerializationResult';
import { withoutUnsupportedElements } from './withoutUnsupportedElements';

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
