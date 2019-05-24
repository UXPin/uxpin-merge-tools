import { Warned } from '../../../../../../common/warning/Warned';
import { WarningDetails } from '../../../../../../common/warning/WarningDetails';
import { ComponentPropertyCustomDescriptors } from '../../ComponentPropertyDefinition';
import { GeneralPropItem } from '../FlowPropItem';
import { parsePropertyDescription } from './parsePropertyDescription';

export async function getPropertyCustomDescriptors(propName:string, propItem:GeneralPropItem):Promise<Warned<ComponentPropertyCustomDescriptors>> {
  const result:ComponentPropertyCustomDescriptors = parsePropertyDescription(propItem.description);
  const warnings:WarningDetails[] = [];

  return {
    result,
    warnings,
  };
}
