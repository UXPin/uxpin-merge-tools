import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { findDefaultExportedArrowFunction } from './findDefaultExportedArrowFunction';
import { findDefaultExportedClass } from './findDefaultExportedClass';
import { findDefaultExportedFunction } from './findDefaultExportedFunction';
import { findExportedClassWithName } from './findExportedClassWithName';
import { findExportedFunctionWithName } from './findExportedFunctionWithName';
import { findSpecifiedClassComponent } from './findSpecifiedClassComponent';
import { findSpecifiedFunctionComponent } from './findSpecifiedFunctionComponent';
import { getComponentFileName } from './getComponentFileName';
import {
  ClassComponentDeclaration,
  ComponentDeclaration,
  FunctionalComponentDeclaration,
} from './getPropsTypeAndDefaultProps';

export function getComponentDeclaration(context:TSSerializationContext):ComponentDeclaration | undefined {
  const fileName:string = getComponentFileName(context);

  return findFunctionalComponent(context.file, fileName)
    || findClassComponent(context.file, fileName);
}

function findFunctionalComponent(
  sourceFile:ts.SourceFile,
  componentFileName:string,
):FunctionalComponentDeclaration | undefined {
  return findSpecifiedFunctionComponent(sourceFile)
    || findDefaultExportedFunction(sourceFile)
    || findExportedFunctionWithName(sourceFile, componentFileName)
    || findDefaultExportedArrowFunction(sourceFile);
}

function findClassComponent(
  sourceFile:ts.SourceFile,
  componentFileName:string,
):ClassComponentDeclaration | undefined {
  return findSpecifiedClassComponent(sourceFile)
    || findDefaultExportedClass(sourceFile)
    || findExportedClassWithName(sourceFile, componentFileName);
}
