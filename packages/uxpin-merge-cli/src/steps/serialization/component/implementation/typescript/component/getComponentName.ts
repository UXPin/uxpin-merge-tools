import { TSSerializationContext } from '../context/getSerializationContext';
import { getComponentFileName } from './getComponentFileName';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';
import * as ts from 'typescript'

export function getComponentName(context:TSSerializationContext, component:ComponentDeclaration):string {
  if(component.name) {
    return component.name.getText()
  }
  if (ts.isArrowFunction(component) && component.parent && (component.parent as ts.ArrowFunction).name){
    return ((component.parent as ts.ArrowFunction).name as ts.Identifier).getText()
  }
  return getComponentFileName(context);
}
