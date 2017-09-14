import { PropItem } from 'react-docgen-typescript/lib';
import { WarningDetails } from '../../../common/warning/WarningDetails';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { parseValue } from './defaultValue/parseValue';
import { convertPropertyType } from './type/convertPropertyType';

export function convertPropItemToPropertyDefinition(propName:string,
                                                    propItem:PropItem):Promise<PropDefinitionSerializationResult> {
  const definition:ComponentPropertyDefinition = {
    description: propItem.description,
    isRequired: propItem.required,
    name: propName,
    type: convertPropertyType(propItem.type),
  };

  if (propItem.defaultValue) {
    return parseValue(propItem.defaultValue.value).then((value:any) => {
      definition.defaultValue = { value };
      return { definition, warnings: [] };
    }).catch((error:Error) => {
      const warning:WarningDetails = {
        message: `Cannot compute default value for property \`${propName}\`.`,
        originalError: error,
      };
      return Promise.resolve({
        definition,
        warnings: [warning],
      });
    });
  }
  return Promise.resolve({ definition, warnings: [] });
}
