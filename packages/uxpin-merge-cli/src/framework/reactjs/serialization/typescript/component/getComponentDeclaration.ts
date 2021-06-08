import { findDefaultExportedArrowFunction } from '../../../../../steps/serialization/component/implementation/typescript/component/findDefaultExportedArrowFunction';
import { findDefaultExportedClass } from '../../../../../steps/serialization/component/implementation/typescript/component/findDefaultExportedClass';
import { findDefaultExportedFunction } from '../../../../../steps/serialization/component/implementation/typescript/component/findDefaultExportedFunction';
import { findExportedArrowFunctionWithName } from '../../../../../steps/serialization/component/implementation/typescript/component/findExportedArrowFunctionWithName';
import { findExportedClassWithName } from '../../../../../steps/serialization/component/implementation/typescript/component/findExportedClassWithName';
import { findExportedFunctionWithName } from '../../../../../steps/serialization/component/implementation/typescript/component/findExportedFunctionWithName';
import {
  findSpecifiedClassComponent,
  findSpecifiedFunctionComponent,
} from '../../../../../steps/serialization/component/implementation/typescript/component/findSpecifiedComponent';
import {
  ClassComponentDeclaration,
  ComponentDeclaration,
  FunctionalComponentDeclaration,
  VariableDeclaration,
} from '../../../../../steps/serialization/component/implementation/typescript/component/getPropsTypeAndDefaultProps';
import { TSSerializationContext } from '../../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { getComponentNameFromPath } from '../../../../../steps/serialization/component/name/getComponentNameFromPath';
import { findExportedFunctionWithReactForwardRef } from './findExportedFunctionWithReactForwardRef';

export function getComponentDeclaration(context:TSSerializationContext):ComponentDeclaration | undefined {
  const componentName:string = getComponentNameFromPath(context.componentPath);

  return findFunctionalComponent(context, componentName)
    || findClassComponent(context, componentName);
}

function findFunctionalComponent(
  context:TSSerializationContext,
  componentName:string,
):FunctionalComponentDeclaration | VariableDeclaration | undefined {
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
