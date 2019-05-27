import { Warned } from '../../../../../../common/warning/Warned';
import { WarningDetails } from '../../../../../../common/warning/WarningDetails';
import { ComponentPropertyDefinition } from '../../ComponentPropertyDefinition';
import { GeneralPropItem } from '../FlowPropItem';
import { getPropertyDescription } from './getPropertyDescription';

export async function getPropertyDescriptionWithWarnings(
  propName:string,
  propItem:GeneralPropItem,
):Promise<Warned<Pick<ComponentPropertyDefinition, 'description'>>> {
  const result:Pick<ComponentPropertyDefinition, 'description'> = {
    description: getPropertyDescription(propItem.description),
  };
  const warnings:WarningDetails[] = [];

  return {
    result,
    warnings,
  };
}
