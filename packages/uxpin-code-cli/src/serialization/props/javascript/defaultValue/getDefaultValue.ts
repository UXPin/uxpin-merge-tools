import { PropItem } from 'react-docgen-typescript/lib';
import { Warned } from '../../../../common/warning/Warned';
import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ComponentPropertyDefinition } from '../../ComponentPropertyDefinition';
import { parseValue } from './parseValue';

export function getDefaultValue(propName:string, propItem:PropItem):Promise<DefaultValueParsingResult> {
  const result:Pick<ComponentPropertyDefinition, 'defaultValue'> = {};
  const warnings:WarningDetails[] = [];
  return new Promise((resolve) => {
    if (propItem.defaultValue) {
      return parseValue(propItem.defaultValue.value)
        .then((value:any) => {
          result.defaultValue = { value };
        })
        .catch((originalError:Error) => {
          warnings.push({ originalError, message: `Cannot compute default value for property \`${propName}\`` });
        })
        .then(() => resolve({ result, warnings }));
    } else {
      resolve({ result, warnings });
    }
  });
}

type DefaultValueParsingResult = Warned<Pick<ComponentPropertyDefinition, 'defaultValue'>>;
