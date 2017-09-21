import { PropItem } from 'react-docgen-typescript/lib';
import { WarningDetails } from '../../../common/warning/WarningDetails';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { parseValue } from './defaultValue/parseValue';
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

function getDefaultValue(propName:string, propItem:PropItem):Promise<DefaultValueParsingResult> {
  const partialDefinition:Pick<ComponentPropertyDefinition, 'defaultValue'> = {};
  const warnings:WarningDetails[] = [];
  return new Promise((resolve) => {
    if (propItem.defaultValue) {
      return parseValue(propItem.defaultValue.value).then((value:any) => {
        partialDefinition.defaultValue = { value };
      }).catch((originalError:Error) => {
        warnings.push({ originalError, message: `Cannot compute default value for property \`${propName}\`.` });
      }).then(() => {
        resolve({ partialDefinition, warnings });
      });
    } else {
      resolve({ partialDefinition, warnings });
    }
  });
}

interface DefaultValueParsingResult {
  partialDefinition:Pick<ComponentPropertyDefinition, 'defaultValue'>;
  warnings:WarningDetails[];
}
