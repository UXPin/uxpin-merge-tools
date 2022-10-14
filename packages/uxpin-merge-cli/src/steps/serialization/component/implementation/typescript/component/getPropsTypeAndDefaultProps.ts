import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getDefaultPropsFromParamDestructuring } from '../defaultValue/getDefaultPropsFromParamDestructuring';
import { getDefaultPropsOfClassComponent } from '../defaultValue/getDefaultPropsOfClassComponent';
import { getPropsTypeOfClassComponent } from '../property/getPropsTypeOfClassComponent';
import { getPropsTypeOfFunctionalComponent } from '../property/getPropsTypeOfFunctionalComponent';
import { findFunctionFromVariableDeclaration } from './findFunctionFromVariableDeclaration';
import { getVariableDeclaration } from './getVariableDeclaration';
import { isClassComponentDeclaration } from './isClassComponentDeclaration';
import { isFunctionalComponentDeclaration } from './isFunctionalComponentDeclaration';

export interface DefaultProps {
  [propName: string]: any;
}

export interface ComponentDeclarationData {
  propsTypeNode: ts.TypeNode | undefined;
  defaultProps: DefaultProps;
}

export type ClassComponentDeclaration = ts.ClassDeclaration | ts.ClassExpression;
export type FunctionalComponentDeclaration = ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression;
export type VariableDeclaration = ts.VariableDeclaration;

export type ComponentDeclaration = FunctionalComponentDeclaration | ClassComponentDeclaration | VariableDeclaration;

export function getPropsTypeAndDefaultProps(
  context: TSSerializationContext,
  component: ComponentDeclaration
): ComponentDeclarationData {
  if (ts.isVariableDeclaration(component)) {
    const fnDeclaration: ts.FunctionLikeDeclaration | undefined = findFunctionFromVariableDeclaration(
      context.file,
      component
    );

    if (fnDeclaration) {
      return {
        defaultProps: getDefaultPropsFromParamDestructuring(context, fnDeclaration),
        propsTypeNode: getPropsTypeOfFunctionalComponent(fnDeclaration, component),
      };
    }
  }

  if (isFunctionalComponentDeclaration(component)) {
    return {
      defaultProps: getDefaultPropsFromParamDestructuring(context, component),
      propsTypeNode: getPropsTypeOfFunctionalComponent(component, getVariableDeclaration(context)),
    };
  }

  if (isClassComponentDeclaration(component)) {
    return {
      defaultProps: getDefaultPropsOfClassComponent(context, component),
      propsTypeNode: getPropsTypeOfClassComponent(component),
    };
  }

  return { defaultProps: {}, propsTypeNode: undefined };
}
