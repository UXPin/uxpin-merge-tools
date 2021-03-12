import { PropertyTypeName, PropertyTypeStructureMap } from '../../../../ComponentPropertyDefinition';
import { convertArrayOfTypeStructure } from './arrayOf/convertArrayOfTypeStructure';
import { convertOneOfTypeStructure } from './oneOf/convertOneOfTypeStructure';
import { convertShapeTypeStructure } from './shape/convertShapeTypeStructure';

type StructureConverters = Partial<{
  [P in PropertyTypeName]:(reactDocgenStructure:any) => PropertyTypeStructureMap[P]
}>;

const TYPE_STRUCTURE_CONVERTERS:StructureConverters = {
  shape: convertShapeTypeStructure,
  typedArray: convertArrayOfTypeStructure,
  union: convertOneOfTypeStructure,
};

export function convertTypeStructure<T extends PropertyTypeName>(typeName:T,
  reactDocgenStructure:any):PropertyTypeStructureMap[T] | {} {
  const convert:StructureConverters[T] | undefined = TYPE_STRUCTURE_CONVERTERS[typeName];
  if (convert) {
    return convert(reactDocgenStructure);
  }

  return {};
}
