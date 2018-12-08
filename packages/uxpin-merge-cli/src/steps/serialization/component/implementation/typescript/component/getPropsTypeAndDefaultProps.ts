import * as ts from 'typescript';
import { getDefaultPropsOfClassComponent } from '../defaultValue/getDefaultPropsOfClassComponent';
import { getPropsTypeOfFunctionalComponent } from '../getPropsTypeOfFunctionalComponent';
import { getPropsTypeOfClassComponent } from '../property/getPropsTypeOfClassComponent';
import {
  TSComponentSerializationEnv,
} from '../serializeTSComponent';
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

export type ComponentDeclaration = ts.FunctionDeclaration | ClassComponentDeclaration;

export function getPropsTypeAndDefaultProps(
  env:TSComponentSerializationEnv,
  sourceFile:ts.SourceFile,
  componentFileName:string,
):ComponentDeclarationData {
  const componentFunc:ts.FunctionDeclaration | undefined = findDefaultExportedFunction(sourceFile) ||
    findExportedFunctionWithName(sourceFile, componentFileName);
  if (componentFunc) {
    return {
      defaultProps: {},
      propsTypeNode: getPropsTypeOfFunctionalComponent(componentFunc),
    };
  }
  const componentClass:ClassComponentDeclaration | undefined = findDefaultExportedClass(sourceFile) ||
    findExportedClassWithName(sourceFile, componentFileName);
  if (componentClass) {
    return {
      defaultProps: getDefaultPropsOfClassComponent(env, componentClass),
      propsTypeNode: getPropsTypeOfClassComponent(componentClass),
    };
  }
  return { defaultProps: {}, propsTypeNode: undefined };
}
