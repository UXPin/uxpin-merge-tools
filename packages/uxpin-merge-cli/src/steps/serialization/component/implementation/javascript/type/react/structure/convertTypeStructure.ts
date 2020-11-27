import { PropertyTypeName, PropertyTypeStructureMap } from '../../../../ComponentPropertyDefinition';
import { convertArrayOfTypeStructure } from './arrayOf/convertArrayOfTypeStructure';
import { convertOneOfTypeStructure } from './oneOf/convertOneOfTypeStructure';
import { convertShapeTypeStructure } from './shape/convertShapeTypeStructure';

export type TypeStructureConversionStrategy =
  <T extends keyof PropertyTypeStructureMap>(reactDocgenStructure:any) => PropertyTypeStructureMap[T];

const TYPE_STRUCTURE_CONVERTERS:Partial<{ [P in PropertyTypeName]:TypeStructureConversionStrategy }> = {
  // @ts-ignore
  shape: convertShapeTypeStructure,
  // @ts-ignore
  typedArray: convertArrayOfTypeStructure,
  // @ts-ignore
  union: convertOneOfTypeStructure,
};

export function convertTypeStructure<T extends PropertyTypeName>(typeName:T,
  reactDocgenStructure:any):PropertyTypeStructureMap[T] {
  const convert:TypeStructureConversionStrategy | undefined = TYPE_STRUCTURE_CONVERTERS[typeName];
  if (convert) {
    return convert(reactDocgenStructure);
  }
  // @ts-ignore
  return {};
}
