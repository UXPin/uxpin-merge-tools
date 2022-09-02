import * as ts from 'typescript';

export function isIntersection(type: ts.Type): type is ts.IntersectionType {
  return type.isIntersection();
}
