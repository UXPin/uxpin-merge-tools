import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { isValidPropName } from '../../validation/props/isValidPropName';
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
    const map:Map<string, ParsedPropertyModel> = this.map;
    this.map.forEach((propertyModel) => connectBindingFrom(propertyModel, map));
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

  public get name():string {
    return this.propertyDefinition.name;
  }

  public hasAutoUpdate():boolean {
    return !!this.autoUpdate;
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

function connectBindingFrom(propertyModel:ParsedPropertyModel, map:Map<string, ParsedPropertyModel>):void {
  const binding:ParsedBindingDescriptor | undefined = propertyModel.getBindingDescriptor();

  if (!binding) {
    return;
  }

  if (!isValidPropName(binding.sourcePropName)) {
    throw new Error(`Incorrect property name pointed as a binding source.
  Expected syntax: @uxpinbind [source property name] [value path - optional].
  Examples:
    @uxpinbind onChange 0.target.checked
    @uxpinbind onSelect`);
  }

  const targetPropertyModel:ParsedPropertyModel | undefined = map.get(binding.sourcePropName);
  if (!targetPropertyModel) {
    throw new Error(`Incorrect property name pointed as a binding source.
      No such property: "${binding.sourcePropName}"`);
  }

  if (targetPropertyModel.hasAutoUpdate()) {
    throw new Error(`More than one property is trying to bind the same source property "${binding.sourcePropName}"`);
  }

  targetPropertyModel.setAutoUpdate({
    targetPropName: propertyModel.name,
    valuePath: binding.sourceValuePath,
  });
}

function isBindingDescriptor(d:ParsedPropertyDescriptor):d is ParsedBindingDescriptor {
  return d.type === CustomDescriptorsTags.BIND;
}
