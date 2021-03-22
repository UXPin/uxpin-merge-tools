import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { findDefaultExportedArrowFunction } from './findDefaultExportedArrowFunction';
import { findDefaultExportedClass } from './findDefaultExportedClass';
import { findDefaultExportedFunction } from './findDefaultExportedFunction';
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
} from './getPropsTypeAndDefaultProps';

export function getComponentDeclaration(context:TSSerializationContext):ComponentDeclaration | undefined {
  const fileName:string = getComponentFileName(context);

  return findFunctionalComponent(context, fileName)
    || findClassComponent(context.file, fileName);
}

function findFunctionalComponent(
  context:TSSerializationContext,
  componentFileName:string,
):FunctionalComponentDeclaration | undefined {
  return findSpecifiedFunctionComponent(context.file)
    || findDefaultExportedFunction(context.file)
    || findExportedFunctionWithName(context.file, componentFileName)
    || findDefaultExportedArrowFunction(context.file)
    || findExportedFunctionWithReactForwardRef(context, componentFileName);
}

function findClassComponent(
  sourceFile:ts.SourceFile,
  componentFileName:string,
):ClassComponentDeclaration | undefined {
  return findSpecifiedClassComponent(sourceFile)
    || findDefaultExportedClass(sourceFile)
    || findExportedClassWithName(sourceFile, componentFileName);
}
