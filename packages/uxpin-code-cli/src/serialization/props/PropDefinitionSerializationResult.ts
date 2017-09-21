import { WarningDetails } from '../../common/warning/WarningDetails';
import { ComponentPropertyDefinition } from './ComponentPropertyDefinition';

export interface PropDefinitionSerializationResult {
  definition:ComponentPropertyDefinition;
  warnings:WarningDetails[];
}
