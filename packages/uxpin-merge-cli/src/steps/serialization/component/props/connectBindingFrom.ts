import { isValidPropName } from '../../validation/props/isValidPropName';
import { ParsedBindingDescriptor } from '../implementation/ParsedPropertyDescriptor';
import { ParsedPropertyModel } from './ParsedPropertyModel';

export function connectBindingFrom(propertyModel:ParsedPropertyModel, map:Map<string, ParsedPropertyModel>):void {
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
