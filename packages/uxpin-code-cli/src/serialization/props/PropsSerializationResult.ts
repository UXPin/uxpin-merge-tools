import { WarningDetails } from '../../common/warning/WarningDetails';
import { ComponentPropertyDefinition } from './ComponentPropertyDefinition';

export interface PropsSerializationResult {
  props:ComponentPropertyDefinition[];
  warnings:WarningDetails[];
}
