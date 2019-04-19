import * as ts from 'typescript';
import { getDefaultPropsFromParamDestructuring } from '../defaultValue/getDefaultPropsFromParamDestructuring';
import { getDefaultPropsOfClassComponent } from '../defaultValue/getDefaultPropsOfClassComponent';
import { getPropsTypeOfClassComponent } from '../property/getPropsTypeOfClassComponent';
import { getPropsTypeOfFunctionalComponent } from '../property/getPropsTypeOfFunctionalComponent';
import { TSSerializationContext } from '../serializeTSComponent';
import { findDefaultExportedArrowFunction } from './findDefaultExportedArrowFunction';
import { findDefaultExportedClass } from './findDefaultExportedClass';
import { findDefaultExportedFunction } from './findDefaultExportedFunction';
import { findExportedClassWithName } from './findExportedClassWithName';
import { findExportedFunctionWithName } from './findExportedFunctionWithName';

export interface DefaultProps {
  [propName:string]:any;
}

export interface ComponentDeclarationData {
  propsTypeNode:ts.TypeNode | undefined;
  defaultProps:DefaultProps;
}

export type ClassComponentDeclaration = ts.ClassDeclaration | ts.ClassExpression;
export type FunctionalComponentDeclaration = ts.FunctionDeclaration | ts.ArrowFunction;

export type ComponentDeclaration = FunctionalComponentDeclaration | ClassComponentDeclaration;

export function getPropsTypeAndDefaultProps(
  context:TSSerializationContext,
  sourceFile:ts.SourceFile,
  fileName:string,
):ComponentDeclarationData {
  const componentFunc:FunctionalComponentDeclaration | undefined = findFunctionalComponent(sourceFile, fileName);
  if (componentFunc) {
    return {
      defaultProps: getDefaultPropsFromParamDestructuring(context, componentFunc),
      propsTypeNode: getPropsTypeOfFunctionalComponent(componentFunc),
    };
  }

  const componentClass:ClassComponentDeclaration | undefined = findClassComponent(sourceFile, fileName);
  if (componentClass) {
    return {
      defaultProps: getDefaultPropsOfClassComponent(context, componentClass),
      propsTypeNode: getPropsTypeOfClassComponent(componentClass),
    };
  }

  return { defaultProps: {}, propsTypeNode: undefined };
}

function findFunctionalComponent(
  sourceFile:ts.SourceFile,
  componentFileName:string,
):FunctionalComponentDeclaration | undefined {
  return findDefaultExportedFunction(sourceFile)
    || findExportedFunctionWithName(sourceFile, componentFileName)
    || findDefaultExportedArrowFunction(sourceFile);
}

function findClassComponent(sourceFile:ts.SourceFile, componentFileName:string):ClassComponentDeclaration | undefined {
  return findDefaultExportedClass(sourceFile) ||
    findExportedClassWithName(sourceFile, componentFileName);
}
