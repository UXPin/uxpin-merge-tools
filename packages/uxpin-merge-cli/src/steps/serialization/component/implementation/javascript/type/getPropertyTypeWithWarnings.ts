import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../../ComponentPropertyDefinition';
import { GeneralPropItem, isFlowPropItem } from '../FlowPropItem';
import { convertFlowPropertyTypeWithWarnings } from './flow/convertFlowPropertyTypeWithWarnings';
import { convertReactPropertyTypeWithWarnings } from './react/convertReactPropertyTypeWithWarnings';

export function getPropertyTypeWithWarnings(propName: string, propItem: GeneralPropItem): Promise<ConversionResult> {
  if (isFlowPropItem(propItem)) {
    return convertFlowPropertyTypeWithWarnings(propName, propItem.flowType);
  }
  return convertReactPropertyTypeWithWarnings(propName, propItem.type);
}

type ConversionResult = Warned<Pick<ComponentPropertyDefinition, 'type'>>;
