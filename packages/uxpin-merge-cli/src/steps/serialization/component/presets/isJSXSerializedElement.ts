import { isObject } from 'lodash';
import { AnySerializedElement, JSXSerializedElement, JSXSerializedElementProp } from './jsx/JSXSerializationResult';

export function isJSXSerializedElement(
  el: AnySerializedElement | JSXSerializedElementProp
): el is JSXSerializedElement {
  return isObject(el) && (el as JSXSerializedElement).uxpinPresetElementType === 'CodeComponent';
}
