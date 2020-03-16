import pReduce = require('p-reduce');
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { getDefaultValue } from './defaultValue/getDefaultValue';
import { GeneralPropItem } from './FlowPropItem';
import { getPropertyCustomDescriptorsWithWarnings } from './props/getPropertyCustomDescriptorsWithWarnings';
import { getPropertyDescriptionWithWarnings } from './props/getPropertyDescriptionWithWarnings';
import { getPropertyTypeWithWarnings } from './type/getPropertyTypeWithWarnings';

export function convertPropItemToPropertyDefinition(propName:string,
  propItem:GeneralPropItem):Promise<PropDefinitionSerializationResult> {
  const partialProviders:Array<Promise<Warned<Partial<ComponentPropertyDefinition>>>> = [
    getDefaultValue(propName, propItem),
    getPropertyTypeWithWarnings(propName, propItem),
    getPropertyCustomDescriptorsWithWarnings(propItem),
    getPropertyDescriptionWithWarnings(propName, propItem),
  ];

  const aggregator:Warned<ComponentPropertyDefinition> = {
    result: {
      description: propItem.description,
      isRequired: propItem.required,
      name: propName,
    },
    warnings: [],
  };

  return pReduce(partialProviders, (result, partial) => {
    Object.assign(result.result, partial.result);
    Object.assign(result.warnings, partial.warnings);
    return result;
  }, aggregator);
}
