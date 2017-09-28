import pReduce = require('p-reduce');
import { PropItem } from 'react-docgen-typescript/lib';
import { Warned } from '../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { getDefaultValue } from './defaultValue/getDefaultValue';
import { convertPropertyTypeWithWarnings } from './type/convertPropertyTypeWithWarnings';

export function convertPropItemToPropertyDefinition(propName:string,
  propItem:PropItem):Promise<PropDefinitionSerializationResult> {
  const partialProviders:Array<Promise<Warned<Partial<ComponentPropertyDefinition>>>> = [
    getDefaultValue(propName, propItem),
    convertPropertyTypeWithWarnings(propName, propItem.type),
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
    return {
      result: { ...result.result, ...partial.result },
      warnings: [...result.warnings, ...partial.warnings],
    };
  }, aggregator);
}
