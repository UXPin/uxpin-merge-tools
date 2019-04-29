import { WarningDetails } from '../../../../../../../common/warning/WarningDetails';
import {
  AnySerializedElement,
  JSXSerializedElement,
  JSXSerializedElementProp,
  JSXSerializedElementProps,
} from '../../JSXSerializationResult';
import { ComponentPlaceholder } from '../generateVirtualModules';

// tslint:disable-next-line:function-name
function __uxpinParsePreset(
  component:ComponentPlaceholder | string | any,
  props?:JSXSerializedElementProps,
  ...children:AnySerializedElement[]):JSXSerializedElement {

  const componentName:string = !!component.name ? component.name : 'Unknown';

  return {
    children,
    name: componentName,
    props: JSON.parse(JSON.stringify(props)) || {},
    uxpinPresetElementType: 'CodeComponent',
    warnings: getPropertySerializationWarnings(props),
  };
}

function getPropertySerializationWarnings(props:JSXSerializedElementProps|undefined):WarningDetails[] {
  if (!props) {
    return [];
  }

  return Object.keys(props).reduce<WarningDetails[]>((warnings, propName) => {
    const propValue:JSXSerializedElementProp = props[propName];
    if (typeof propValue === 'function') {
      warnings.push({ message: `Unsupported property \`${propName}\` of a type \`${typeof propValue}\`` });
    }
    return warnings;
  }, []);
}

(global as any).__uxpinParsePreset = __uxpinParsePreset;
