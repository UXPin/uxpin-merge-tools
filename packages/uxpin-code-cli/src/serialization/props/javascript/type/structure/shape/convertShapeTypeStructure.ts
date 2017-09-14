import { reduce } from 'lodash';
import { ShapeTypeStructure } from '../../../../ComponentPropertyDefinition';
import { convertPropertyType } from '../../convertPropertyType';

export function convertShapeTypeStructure(reactDocgenShape:any):ShapeTypeStructure {
  return reduce(reactDocgenShape, (aggregator:ShapeTypeStructure, value:any, key:string) => {
    aggregator[key] = convertPropertyType(value);
    return aggregator;
  }, {} as ShapeTypeStructure);
}
