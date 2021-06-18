import * as ts from 'typescript';
import { findFunctionFromVariableDeclaration } from '../../../../../steps/serialization/component/implementation/typescript/component/findFunctionFromVariableDeclaration';
import { ComponentDeclaration } from '../../../../../steps/serialization/component/implementation/typescript/component/getPropsTypeAndDefaultProps';
import { isClassComponentDeclaration } from '../../../../../steps/serialization/component/implementation/typescript/component/isClassComponentDeclaration';
import { isFunctionalComponentDeclaration } from '../../../../../steps/serialization/component/implementation/typescript/component/isFunctionalComponentDeclaration';
import { TSSerializationContext } from '../../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { getDefaultPropsFromParamDestructuring } from '../defaultValue/getDefaultPropsFromParamDestructuring';
import { getDefaultPropsOfClassComponent } from '../defaultValue/getDefaultPropsOfClassComponent';
import { getPropsTypeOfClassComponent } from '../property/getPropsTypeOfClassComponent';
import { getPropsTypeOfFunctionalComponent } from '../property/getPropsTypeOfFunctionalComponent';
import { getVariableDeclaration } from './getVariableDeclaration';

export interface DefaultProps {
  [propName:string]:any;
}

export interface ComponentDeclarationData {
  propsTypeNode:ts.TypeNode | undefined;
  defaultProps:DefaultProps;
}

export function getPropsTypeAndDefaultProps(
  context:TSSerializationContext,
  component:ComponentDeclaration,
):ComponentDeclarationData {
  if (ts.isVariableDeclaration(component)) {
    const fnDeclaration:ts.FunctionLikeDeclaration | undefined = findFunctionFromVariableDeclaration(
      context.file,
      component,
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
