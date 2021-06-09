import { Warned } from '../../../../../common/warning/Warned';
import { WarningDetails } from '../../../../../common/warning/WarningDetails';
import { ParsedPropertyDescriptors } from '../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { GeneralPropItem } from '../FlowPropItem';
import { getPropertyCustomDescriptors } from './getPropertyCustomDescriptors';

export async function getPropertyCustomDescriptorsWithWarnings(
  propItem:GeneralPropItem,
):Promise<Warned<ParsedPropertyDescriptors>> {
  const result:ParsedPropertyDescriptors = getPropertyCustomDescriptors(propItem.description);
  const warnings:WarningDetails[] = [];

  return {
    result,
    warnings,
  };
}
