import { Warned } from '../../../../../../common/warning/Warned';
import { WarningDetails } from '../../../../../../common/warning/WarningDetails';
import { ComponentPropertyDefinition } from '../../ComponentPropertyDefinition';
import { GeneralPropItem } from '../FlowPropItem';
import { parseValue } from './parseValue';

export function getDefaultValue(propName:string, propItem:GeneralPropItem):Promise<DefaultValueParsingResult> {
  const result:Pick<ComponentPropertyDefinition, 'defaultValue'> = {};
  const warnings:WarningDetails[] = [];
  return new Promise((resolve) => {
    if (propItem.defaultValue) {
      parseValue(propItem.defaultValue.value)
        .then((value:any) => {
          result.defaultValue = { value };
        })
        .catch((originalError:Error) => {
          warnings.push({
            message: `Cannot compute default value for property \`${propName}\`

${getFirstLine(originalError.stack || '')}

`,
          });
        })
        .then(() => resolve({ result, warnings }));
    } else {
      resolve({ result, warnings });
    }
  });
}

function getFirstLine(text:string):string {
  return text.split('\n')[0];
}

type DefaultValueParsingResult = Warned<Pick<ComponentPropertyDefinition, 'defaultValue'>>;
