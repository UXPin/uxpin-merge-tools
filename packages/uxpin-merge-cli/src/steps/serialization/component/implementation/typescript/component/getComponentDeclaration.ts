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
import { getComponentFileName } from './getComponentFileName';
import {
  ClassComponentDeclaration,
  ComponentDeclaration,
  FunctionalComponentDeclaration,
  VariableDeclaration,
} from './getPropsTypeAndDefaultProps';

export function getComponentDeclaration(context:TSSerializationContext):ComponentDeclaration | undefined {
  const fileName:string = getComponentFileName(context);

  return findFunctionalComponent(context, fileName)
    || findClassComponent(context, fileName);
}

function findFunctionalComponent(
  context:TSSerializationContext,
  componentFileName:string,
):FunctionalComponentDeclaration | VariableDeclaration | undefined {
  return findSpecifiedFunctionComponent(context)
    || findDefaultExportedFunction(context)
    || findExportedFunctionWithName(context, componentFileName)
    || findDefaultExportedArrowFunction(context)
    || findExportedArrowFunctionWithName(context, componentFileName)
    || findExportedFunctionWithReactForwardRef(context, componentFileName);
}

function findClassComponent(
  context:TSSerializationContext,
  componentFileName:string,
):ClassComponentDeclaration | undefined {
  return findSpecifiedClassComponent(context)
    || findDefaultExportedClass(context)
    || findExportedClassWithName(context, componentFileName);
}
