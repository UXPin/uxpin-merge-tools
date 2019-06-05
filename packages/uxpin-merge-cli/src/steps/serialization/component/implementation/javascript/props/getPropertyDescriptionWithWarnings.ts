import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../../ComponentPropertyDefinition';
import { GeneralPropItem } from '../FlowPropItem';
import { getPropertyDescription } from './getPropertyDescription';

export async function getPropertyDescriptionWithWarnings(
  propName:string,
  propItem:GeneralPropItem,
):Promise<Warned<Pick<ComponentPropertyDefinition, 'description'> | {}>> {
  if (!propItem.description) {
    return {
      result: {},
      warnings: [],
    };
  }

  return {
    result: {
      description: getPropertyDescription(propItem.description),
    },
    warnings: [],
  };
}
