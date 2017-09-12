import {
  ComponentPropertyDefinition,
  PropertyDefaultValue,
  PropertyType,
} from '../../../../src/serialization/props/ComponentPropertyDefinition';
import { getBuiltValue } from '../../../utils/builders/getBuiltValue';
import { PropertyDefaultValueBuilder } from './PropertyDefaultValueBuilder';
import { PropertyTypeBuilder } from './PropertyTypeBuilder';

export class ComponentPropertyDefinitionBuilder {

  private name:string = '';
  private isRequired:boolean = false;
  private defaultValue?:PropertyDefaultValue;
  private description:string = '';
  private type:PropertyType;

  public withType(type:PropertyType|PropertyTypeBuilder):ComponentPropertyDefinitionBuilder {
    this.type = getBuiltValue(type, PropertyTypeBuilder);
    return this;
  }

  public withDescription(description:string):ComponentPropertyDefinitionBuilder {
    this.description = description;
    return this;
  }

  public withDefaultValue(value:PropertyDefaultValue | PropertyDefaultValueBuilder):ComponentPropertyDefinitionBuilder {
    this.defaultValue = getBuiltValue(value, PropertyDefaultValueBuilder);
    return this;
  }

  public withName(name:string):ComponentPropertyDefinitionBuilder {
    this.name = name;
    return this;
  }

  public withIsRequired(isRequired:boolean):ComponentPropertyDefinitionBuilder {
    this.isRequired = isRequired;
    return this;
  }

  public build():ComponentPropertyDefinition {
    const typeDef:ComponentPropertyDefinition = {
      description: this.description,
      isRequired: this.isRequired,
      name: this.name,
      type: this.type,
    };
    if (this.defaultValue) {
      typeDef.defaultValue = this.defaultValue;
    }
    return typeDef;
  }
}

export function aComponentPropertyDefinition():ComponentPropertyDefinitionBuilder {
  return new ComponentPropertyDefinitionBuilder();
}
