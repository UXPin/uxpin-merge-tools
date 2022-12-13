import { Warned } from '../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../component/implementation/ComponentPropertyDefinition';
import { PropDefinitionSerializationResult } from '../component/implementation/PropDefinitionSerializationResult';
import { validateCustomNames } from './props/validateCustomNames';
import { validateCustomTypes } from './props/validateCustomTypes';

const VALIDATORS: ComponentPropertyDefinitionValidator[] = [validateCustomNames, validateCustomTypes];

export type ComponentPropertyDefinitionValidator = (
  props: PropDefinitionSerializationResult[]
) => PropDefinitionSerializationResult[];

export function validateProps(
  props: Array<Warned<ComponentPropertyDefinition>>
): Array<Warned<ComponentPropertyDefinition>> {
  return VALIDATORS.reduce((validated, validator) => validator(validated), props);
}
