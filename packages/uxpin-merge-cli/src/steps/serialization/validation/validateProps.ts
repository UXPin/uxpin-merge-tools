import { Warned } from '../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../component/implementation/ComponentPropertyDefinition';
import { validateCustomNames } from './props/validateCustomNames';

const VALIDATORS:ComponentPropertyDefinitionValidator[] = [
  validateCustomNames,
];

export type ComponentPropertyDefinitionValidator = (props:Warned<ComponentPropertyDefinition>[]) => Warned<ComponentPropertyDefinition>[];

export function validateProps(props:Warned<ComponentPropertyDefinition>[]):Warned<ComponentPropertyDefinition>[] {
  VALIDATORS.forEach((validator) => validator(props));

  return props;
}
