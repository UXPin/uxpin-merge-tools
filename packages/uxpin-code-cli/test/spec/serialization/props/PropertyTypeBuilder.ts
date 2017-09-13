import {
  PropertyType,
  PropertyTypeStructureMap,
} from '../../../../src/serialization/props/ComponentPropertyDefinition';

export class PropertyTypeBuilder<T extends keyof PropertyTypeStructureMap> {
  private name:T;
  private structure:PropertyTypeStructureMap[T] = {};

  public withStructure(structure:PropertyTypeStructureMap[T]):PropertyTypeBuilder<T> {
    this.structure = structure;
    return this;
  }

  public withName(name:T):PropertyTypeBuilder<T> {
    this.name = name;
    return this;
  }

  public build():PropertyType<T> {
    return {
      name: this.name,
      structure: this.structure,
    };
  }
}

export function aPropertyType<T extends keyof PropertyTypeStructureMap>():PropertyTypeBuilder<T> {
  return new PropertyTypeBuilder<T>();
}
