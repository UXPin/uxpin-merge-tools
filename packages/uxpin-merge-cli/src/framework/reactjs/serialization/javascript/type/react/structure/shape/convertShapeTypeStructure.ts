import { reduce } from 'lodash';
import { ShapeTypeStructure } from '../../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { convertPropertyType } from '../../convertPropertyType';

export function convertShapeTypeStructure(reactDocgenShape:any):ShapeTypeStructure {
  return reduce(reactDocgenShape, (shape:ShapeTypeStructure, propType:any, propName:string) => {
    shape[propName] = convertPropertyType(propType);
    return shape;
  }, {} as ShapeTypeStructure);
}
