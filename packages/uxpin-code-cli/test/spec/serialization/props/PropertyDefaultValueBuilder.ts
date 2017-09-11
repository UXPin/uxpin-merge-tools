import { PropertyDefaultValue } from '../../../../src/serialization/props/ComponentPropertyDefinition';

export class PropertyDefaultValueBuilder {

  private value:any = '';
  private isComputed:boolean = false;

  public withIsComputed(isComputed:boolean):PropertyDefaultValueBuilder {
    this.isComputed = isComputed;
    return this;
  }

  public withValue(value:any):PropertyDefaultValueBuilder {
    this.value = value;
    return this;
  }

  public build():PropertyDefaultValue {
    return {
      isComputed: this.isComputed,
      value: this.value,
    };
  }
}

export function aDefaultValue():PropertyDefaultValueBuilder {
  return new PropertyDefaultValueBuilder();
}
