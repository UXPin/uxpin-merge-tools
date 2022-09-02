// tslint:disable-next-line:max-classes-per-file
import { WarningDetails } from '../../../../common/warning/WarningDetails';
import {
  ComponentProperty,
  ComponentPropertyCustomDescriptors,
  PropertyAutoUpdate,
} from '../implementation/ComponentPropertyDefinition';
import {
  isBindingDescriptor,
  ParsedBindingDescriptor,
  ParsedPropertyDescriptor,
} from '../implementation/ParsedPropertyDescriptor';
import { PropDefinitionParsingResult } from '../implementation/PropDefinitionParsingResult';
import { PropDefinitionSerializationResult } from '../implementation/PropDefinitionSerializationResult';

export class ParsedPropertyModel {
  private warnings: WarningDetails[];
  private descriptors: ParsedPropertyDescriptor[];
  private propertyDefinition: ComponentProperty;
  private autoUpdate?: PropertyAutoUpdate;

  constructor({ warnings, result: { descriptors, ...definition } }: PropDefinitionParsingResult) {
    this.warnings = warnings;
    this.descriptors = descriptors;
    this.propertyDefinition = definition;
  }

  public get name(): string {
    return this.propertyDefinition.name;
  }

  public hasAutoUpdate(): boolean {
    return !!this.autoUpdate;
  }

  public setAutoUpdate(autoUpdate: PropertyAutoUpdate): void {
    this.autoUpdate = autoUpdate;
  }

  public getBindingDescriptor(): ParsedBindingDescriptor | undefined {
    return this.descriptors.find(isBindingDescriptor);
  }

  public serialize(): PropDefinitionSerializationResult {
    return {
      result: {
        ...this.propertyDefinition,
        ...this.serializeDescriptors(),
        ...this.serializeAutoUpdate(),
      },
      warnings: this.warnings,
    };
  }

  private serializeDescriptors(): ComponentPropertyCustomDescriptors {
    return this.descriptors.reduce<ComponentPropertyCustomDescriptors>((result, descriptor) => {
      Object.assign(result, descriptor.serialized);
      return result;
    }, {});
  }

  private serializeAutoUpdate(): Pick<ComponentPropertyCustomDescriptors, 'autoUpdate'> {
    if (this.autoUpdate) {
      return { autoUpdate: this.autoUpdate };
    }
    return {};
  }
}
