import { PropDefinitionParsingResult } from '../implementation/PropDefinitionParsingResult';
import { PropDefinitionSerializationResult } from '../implementation/PropDefinitionSerializationResult';
import { connectBindingFrom } from './connectBindingFrom';
import { ParsedPropertyModel } from './ParsedPropertyModel';

export class ParsedPropertiesCollection {
  private map: Map<string, ParsedPropertyModel>;

  constructor(props: PropDefinitionParsingResult[]) {
    this.map = new Map<string, ParsedPropertyModel>();
    props.forEach((prop) => {
      this.map.set(prop.result.name, new ParsedPropertyModel(prop));
    });
  }

  public serialize(): PropDefinitionSerializationResult[] {
    this.createBindingConnections();
    const result: PropDefinitionSerializationResult[] = [];
    this.map.forEach((prop) => result.push(prop.serialize()));
    return result;
  }

  private createBindingConnections(): void {
    const map: Map<string, ParsedPropertyModel> = this.map;
    this.map.forEach((propertyModel) => connectBindingFrom(propertyModel, map));
  }
}
