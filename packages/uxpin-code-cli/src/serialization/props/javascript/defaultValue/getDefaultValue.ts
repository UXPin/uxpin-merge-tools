import { PropItem } from 'react-docgen-typescript/lib';
import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ComponentPropertyDefinition } from '../../ComponentPropertyDefinition';
import { parseValue } from './parseValue';

export function getDefaultValue(propName:string, propItem:PropItem):Promise<DefaultValueParsingResult> {
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
