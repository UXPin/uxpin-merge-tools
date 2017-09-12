import { PropertyDefaultValue } from '../../../../src/serialization/props/ComponentPropertyDefinition';

export class PropertyDefaultValueBuilder {

  private value:any = '';

  public withValue(value:any):PropertyDefaultValueBuilder {
    this.value = value;
    return this;
  }

  public build():PropertyDefaultValue {
    return {
      value: this.value,
    };
  }
}

export function aDefaultValue():PropertyDefaultValueBuilder {
  return new PropertyDefaultValueBuilder();
}
