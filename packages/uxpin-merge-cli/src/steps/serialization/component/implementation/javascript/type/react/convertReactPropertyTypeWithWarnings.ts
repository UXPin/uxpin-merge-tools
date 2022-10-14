import { PropItemType } from 'react-docgen-typescript/lib';
import { Warned } from '../../../../../../../common/warning/Warned';
import { WarningDetails } from '../../../../../../../common/warning/WarningDetails';
import { ComponentPropertyDefinition } from '../../../ComponentPropertyDefinition';
import { convertPropertyType } from './convertPropertyType';

export function convertReactPropertyTypeWithWarnings(
  propName: string,
  propType: PropItemType
): Promise<ConversionResult> {
  return new Promise<ConversionResult>((resolve) => {
    resolve({
      result: { type: convertPropertyType(propType) },
      warnings: [],
    });
  }).catch(() => {
    const warning: WarningDetails = {
      message: `Cannot parse type of a property '${propName}'`,
    };
    return { result: {}, warnings: [warning] };
  });
}

type ConversionResult = Warned<Pick<ComponentPropertyDefinition, 'type'>>;
