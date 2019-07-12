import { Warned } from '../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../component/implementation/ComponentPropertyDefinition';
import { validateCustomNames } from './props/validateCustomNames';
import { validateCustomTypes } from './props/validateCustomTypes';

const VALIDATORS:ComponentPropertyDefinitionValidator[] = [
  validateCustomNames,
  validateCustomTypes,
];

export type ComponentPropertyDefinitionValidator =
  (props:Array<Warned<ComponentPropertyDefinition>>) => Array<Warned<ComponentPropertyDefinition>>;

export function validateProps(
  props:Array<Warned<ComponentPropertyDefinition>>,
):Array<Warned<ComponentPropertyDefinition>> {
  const result:Array<Warned<ComponentPropertyDefinition>> = VALIDATORS
    .reduce((validated, validator) => validator(validated), props);

  return result;
}
