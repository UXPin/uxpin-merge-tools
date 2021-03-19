import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getDefaultPropsFromParamDestructuring } from '../defaultValue/getDefaultPropsFromParamDestructuring';
import { getDefaultPropsOfClassComponent } from '../defaultValue/getDefaultPropsOfClassComponent';
import { getPropsTypeOfClassComponent } from '../property/getPropsTypeOfClassComponent';
import { getPropsTypeOfFunctionalComponent } from '../property/getPropsTypeOfFunctionalComponent';
import { isClassComponentDeclaration } from './isClassComponentDeclaration';
import { isFunctionalComponentDeclaration } from './isFunctionalComponentDeclaration';
import {getVariableDeclaration} from "./getVariableDeclaration";

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
  component:ComponentDeclaration,
):ComponentDeclarationData {
  if (isFunctionalComponentDeclaration(component)) {
    return {
      defaultProps: getDefaultPropsFromParamDestructuring(context, component),
      propsTypeNode: getPropsTypeOfFunctionalComponent(component,  getVariableDeclaration(context)),
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
