import { AnySerializedElement, JSXSerializedElement, JSXSerializedElementProps } from '../../JSXSerializationResult';

interface Component extends Function {
  displayName?:string;
}

// tslint:disable-next-line:function-name
function __uxpinParsePreset(
  type:Component,
  props:JSXSerializedElementProps,
  ...children:AnySerializedElement[],
):JSXSerializedElement {
  const displayName:string = typeof type === 'function'
    ? type.displayName || type.name || 'Unknown'
    : type;

  return {
    children,
    name: displayName,
    props: JSON.parse(JSON.stringify(props)),
    uxpinPresetElementType: 'CodeComponent',
  };
}

(global as any).__uxpinParsePreset = __uxpinParsePreset;
