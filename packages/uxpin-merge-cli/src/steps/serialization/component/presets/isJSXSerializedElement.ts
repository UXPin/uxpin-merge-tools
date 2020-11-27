import { isObject } from 'lodash';
import { AnySerializedElement, JSXSerializedElement, JSXSerializedElementProp } from './jsx/JSXSerializationResult';

export function isJSXSerializedElement(el:AnySerializedElement | JSXSerializedElementProp):el is JSXSerializedElement {
  // @ts-ignore
  return isObject(el) && el.uxpinPresetElementType === 'CodeComponent';
}
