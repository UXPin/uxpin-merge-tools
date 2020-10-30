import { ArrowFunction, Identifier, isArrowFunction } from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getComponentFileName } from './getComponentFileName';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function getComponentName(context:TSSerializationContext, component:ComponentDeclaration):string {
  if (component.name) {
    return component.name.getText();
  }
  // Support named arrow functions and use the component parent's name.
  // https://github.com/UXPin/uxpin-merge-tools/issues/208
  if (isArrowFunction(component) && component.parent &&
      'name' in component.parent && (component.parent as ArrowFunction).name) {
    return ((component.parent as ArrowFunction).name as Identifier).getText();
  }
  return getComponentFileName(context);
}
