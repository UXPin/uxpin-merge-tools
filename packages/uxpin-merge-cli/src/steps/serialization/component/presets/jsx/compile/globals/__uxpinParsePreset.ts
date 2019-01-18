import { WarningDetails } from '../../../../../../../common/warning/WarningDetails';
import {
  AnySerializedElement,
  JSXSerializedElement,
  JSXSerializedElementProp,
  JSXSerializedElementProps
} from '../../JSXSerializationResult';

interface Component extends Function {
  displayName?:string;
}

// tslint:disable-next-line:function-name
function __uxpinParsePreset(
  type:Component,
  props?:JSXSerializedElementProps,
  ...children:AnySerializedElement[]):JSXSerializedElement {

  const displayName:string = typeof type === 'function'
    ? type.displayName || type.name || 'Unknown'
    : type;

  return {
    children,
    name: displayName,
    props: JSON.parse(JSON.stringify(props)) || {},
    uxpinPresetElementType: 'CodeComponent',
    warnings: getPropertySerializationWarnings(props),
  };
}

function getPropertySerializationWarnings(props:JSXSerializedElementProps|undefined):WarningDetails[] {
  if (!props) {
    return [];
  }

  return Object.keys(props).reduce<WarningDetails[]>((warninigs, propName) => {
    const propValue:JSXSerializedElementProp = props[propName];
    if (typeof propValue === 'function') {
      warninigs.push({ message: `Unsupported property \`${propName}\` of a type \`${typeof propValue}\`` });
    }
    return warninigs;
  }, []);
}

(global as any).__uxpinParsePreset = __uxpinParsePreset;
