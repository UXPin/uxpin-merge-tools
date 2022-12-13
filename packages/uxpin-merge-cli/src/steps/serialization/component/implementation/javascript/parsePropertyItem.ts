import pReduce = require('p-reduce');
import { Warned } from '../../../../../common/warning/Warned';
import { ParsedComponentProperty } from '../ComponentPropertyDefinition';
import { PropDefinitionParsingResult } from '../PropDefinitionParsingResult';
import { getDefaultValue } from './defaultValue/getDefaultValue';
import { GeneralPropItem } from './FlowPropItem';
import { getPropertyCustomDescriptorsWithWarnings } from './props/getPropertyCustomDescriptorsWithWarnings';
import { getPropertyDescriptionWithWarnings } from './props/getPropertyDescriptionWithWarnings';
import { getPropertyTypeWithWarnings } from './type/getPropertyTypeWithWarnings';

export function parsePropertyItem(propName: string, propItem: GeneralPropItem): Promise<PropDefinitionParsingResult> {
  const partialProviders: Array<Promise<Warned<Partial<ParsedComponentProperty>>>> = [
    getDefaultValue(propName, propItem),
    getPropertyTypeWithWarnings(propName, propItem),
    getPropertyCustomDescriptorsWithWarnings(propItem),
    getPropertyDescriptionWithWarnings(propName, propItem),
  ];

  const aggregator: PropDefinitionParsingResult = {
    result: {
      description: propItem.description,
      descriptors: [],
      isRequired: propItem.required,
      name: propName,
    },
    warnings: [],
  };

  return pReduce(
    partialProviders,
    (result, partial) => {
      Object.assign(result.result, partial.result);
      Object.assign(result.warnings, partial.warnings);
      return result;
    },
    aggregator
  );
}
