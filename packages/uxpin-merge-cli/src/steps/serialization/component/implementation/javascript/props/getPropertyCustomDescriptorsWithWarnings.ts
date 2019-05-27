import { Warned } from '../../../../../../common/warning/Warned';
import { WarningDetails } from '../../../../../../common/warning/WarningDetails';
import { ComponentPropertyCustomDescriptors } from '../../ComponentPropertyDefinition';
import { GeneralPropItem } from '../FlowPropItem';
import { getPropertyCustomDescriptors } from './getPropertyCustomDescriptors';

export async function getPropertyCustomDescriptorsWithWarnings(
  propName:string,
  propItem:GeneralPropItem,
):Promise<Warned<ComponentPropertyCustomDescriptors>> {
  const result:ComponentPropertyCustomDescriptors = getPropertyCustomDescriptors(propItem.description);
  const warnings:WarningDetails[] = [];

  return {
    result,
    warnings,
  };
}
