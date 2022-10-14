import * as ts from 'typescript';
import { getNodeName } from '../getNodeName';
import { isPrivateProperty } from './isPrivateProperty';
import { isStaticProperty } from './isStaticProperty';

const REACT_DEFAULT_PROPS_PROPERTY_NAME = 'defaultProps';

export function isDefaultPropertiesStaticProperty(member: ts.ClassElement): member is ts.PropertyDeclaration {
  return (
    ts.isPropertyDeclaration(member) &&
    isStaticProperty(member) &&
    !isPrivateProperty(member) &&
    getNodeName(member) === REACT_DEFAULT_PROPS_PROPERTY_NAME
  );
}
