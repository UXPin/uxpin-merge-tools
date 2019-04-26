import { TSSerializationContext } from '../context/getSerializationContext';
import { getComponentFileName } from './getComponentFileName';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function getComponentName(context:TSSerializationContext, component:ComponentDeclaration):string {
  return component.name && component.name.getText()
    || getComponentFileName(context);
}
