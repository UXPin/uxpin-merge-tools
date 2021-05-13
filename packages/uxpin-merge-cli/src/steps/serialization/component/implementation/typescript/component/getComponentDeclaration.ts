import { getComponentNameFromPath } from '../../../name/getComponentNameFromPath';
import { TSSerializationContext } from '../context/getSerializationContext';
import { findDefaultExportedArrowFunction } from './findDefaultExportedArrowFunction';
import { findDefaultExportedClass } from './findDefaultExportedClass';
import { findDefaultExportedFunction } from './findDefaultExportedFunction';
import { findExportedArrowFunctionWithName } from './findExportedArrowFunctionWithName';
import { findExportedClassWithName } from './findExportedClassWithName';
import { findExportedFunctionWithName } from './findExportedFunctionWithName';
import { findExportedFunctionWithReactForwardRef } from './findExportedFunctionWithReactForwardRef';
import {
  findSpecifiedClassComponent,
  findSpecifiedFunctionComponent,
} from './findSpecifiedComponent';
import {
  ClassComponentDeclaration,
  ComponentDeclaration,
  FunctionalComponentDeclaration,
} from './getPropsTypeAndDefaultProps';

export function getComponentDeclaration(context:TSSerializationContext):ComponentDeclaration | undefined {
  const componentName:string = getComponentNameFromPath(context.componentPath);

  return findFunctionalComponent(context, componentName)
    || findClassComponent(context, componentName);
}

function findFunctionalComponent(
  context:TSSerializationContext,
  componentName:string,
):FunctionalComponentDeclaration | undefined {
  return findSpecifiedFunctionComponent(context)
    || findDefaultExportedFunction(context)
    || findExportedFunctionWithName(context, componentName)
    || findDefaultExportedArrowFunction(context)
    || findExportedArrowFunctionWithName(context, componentName)
    || findExportedFunctionWithReactForwardRef(context, componentName);
}

function findClassComponent(
  context:TSSerializationContext,
  componentName:string,
):ClassComponentDeclaration | undefined {
  return findSpecifiedClassComponent(context)
    || findDefaultExportedClass(context)
    || findExportedClassWithName(context, componentName);
}
