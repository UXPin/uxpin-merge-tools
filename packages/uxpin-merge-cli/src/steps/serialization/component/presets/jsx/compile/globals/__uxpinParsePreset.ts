import { take } from 'lodash';
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

  if (component === undefined) {
    const error:Error = new Error('Unknown component!');
    error.message = parsePresetErrorMessage(error);
    throw error;
  }

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

const ERROR_LINES:number = 5;
function parsePresetErrorMessage(error:Error):string {
  if (!error.stack) {
    return error.message;
  }

  const lines:string[] = error.stack.split('\n').filter((line) => !line.match(/at __uxpinParsePreset/gi));

  return take(lines, ERROR_LINES).join('\n');
}

(global as any).__uxpinParsePreset = __uxpinParsePreset;
