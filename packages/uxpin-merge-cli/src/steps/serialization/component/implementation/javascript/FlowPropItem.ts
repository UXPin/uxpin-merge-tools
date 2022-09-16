import { PropItem } from 'react-docgen-typescript/lib';
import { FlowType } from '../../../../../types/babylon-ast';

export interface FlowPropItem {
  required: boolean;
  flowType: FlowType;
  description: string;
  defaultValue: any;
}

export type GeneralPropItem = PropItem | FlowPropItem;

export function isFlowPropItem(propItem: GeneralPropItem): propItem is FlowPropItem {
  return propItem.hasOwnProperty('flowType');
}
