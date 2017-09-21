import { PropItem } from 'react-docgen-typescript/lib';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { getDefaultValue } from './defaultValue/getDefaultValue';
import { convertPropertyType } from './type/convertPropertyType';

export function convertPropItemToPropertyDefinition(propName:string,
  propItem:PropItem):Promise<PropDefinitionSerializationResult> {
  return getDefaultValue(propName, propItem).then(({ partialDefinition, warnings }) => {
    const definition:ComponentPropertyDefinition = {
      ...partialDefinition,
      description: propItem.description,
      isRequired: propItem.required,
      name: propName,
      type: convertPropertyType(propItem.type),
    };
    return { definition, warnings };
  });
}
