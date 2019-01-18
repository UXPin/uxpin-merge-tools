import { reduce } from 'lodash';
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
    }
    return mappedProps;
  }, {});
}
