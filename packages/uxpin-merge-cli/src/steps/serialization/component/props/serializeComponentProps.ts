import { WarningDetails } from '../../../../common/warning/WarningDetails';
import {
  ComponentProperty,
  ComponentPropertyCustomDescriptors,
  CustomDescriptorsTags,
  PropertyAutoUpdate,
} from '../implementation/ComponentPropertyDefinition';
import { ParsedBindingDescriptor, ParsedPropertyDescriptor } from '../implementation/ParsedPropertyDescriptor';
import { PropDefinitionParsingResult } from '../implementation/PropDefinitionParsingResult';
import { PropDefinitionSerializationResult } from '../implementation/PropDefinitionSerializationResult';

export function serializeComponentProps(props:PropDefinitionParsingResult[]):PropDefinitionSerializationResult[] {
  const collection:PropertiesCollection = new PropertiesCollection(props);
  return collection.serialize();
}

class PropertiesCollection {

  private map:Map<string, ParsedPropertyModel>;

  constructor(props:PropDefinitionParsingResult[]) {
    this.map = new Map<string, ParsedPropertyModel>();
    props.forEach((prop) => {
      this.map.set(prop.result.name, new ParsedPropertyModel(prop));
    });
  }

  public serialize():PropDefinitionSerializationResult[] {
    this.createBindingConnections();
    const result:PropDefinitionSerializationResult[] = [];
    this.map.forEach((prop) => result.push(prop.serialize()));
    return result;
  }

  private createBindingConnections():void {
    this.map.forEach((propertyModel, propertyName) => {
      const binding:ParsedBindingDescriptor | undefined = propertyModel.getBindingDescriptor();
      if (binding) {
        this.map.get(binding.sourcePropName)!.setAutoUpdate({
          targetPropName: propertyName,
          valuePath: binding.sourceValuePath,
        });
      }
    });
  }
}

// tslint:disable-next-line:max-classes-per-file
class ParsedPropertyModel {

  private warnings:WarningDetails[];
  private descriptors:ParsedPropertyDescriptor[];
  private propertyDefinition:ComponentProperty;
  private autoUpdate?:PropertyAutoUpdate;

  constructor({ warnings, result: { descriptors, ...definition } }:PropDefinitionParsingResult) {
    this.warnings = warnings;
    this.descriptors = descriptors;
    this.propertyDefinition = definition;
  }

  public setAutoUpdate(autoUpdate:PropertyAutoUpdate):void {
    this.autoUpdate = autoUpdate;
  }

  public getBindingDescriptor():ParsedBindingDescriptor | undefined {
    return this.descriptors.find(isBindingDescriptor);
  }

  public serialize():PropDefinitionSerializationResult {
    return {
      result: {
        ...this.propertyDefinition,
        ...this.serializeDescriptors(),
        ...this.serializeAutoUpdate(),
      },
      warnings: this.warnings,
    };
  }

  private serializeDescriptors():ComponentPropertyCustomDescriptors {
    return this.descriptors.reduce<ComponentPropertyCustomDescriptors>((result, descriptor) => {
      Object.assign(result, descriptor.serialized);
      return result;
    }, {});
  }

  private serializeAutoUpdate():Pick<ComponentPropertyCustomDescriptors, 'autoUpdate'> {
    if (this.autoUpdate) {
      return { autoUpdate: this.autoUpdate };
    }
    return {};
  }
}

function isBindingDescriptor(d:ParsedPropertyDescriptor):d is ParsedBindingDescriptor {
  return d.type === CustomDescriptorsTags.BIND;
}
