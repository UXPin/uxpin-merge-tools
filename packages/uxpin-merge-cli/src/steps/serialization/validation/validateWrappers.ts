import { Warned } from '../../../common/warning/Warned';
import { ComponentWrapper } from '../component/wrappers/ComponentWrapper';

const VALIDATORS:ComponentWrapperValidator[] = [];

export type ComponentWrapperValidator = (wrappers:Array<Warned<ComponentWrapper>>) => Array<Warned<ComponentWrapper>>;

export function validateWrappers(wrappers:Array<Warned<ComponentWrapper>> | undefined):Array<Warned<ComponentWrapper>> | undefined {
  if (!wrappers) {
    return undefined;
  }

  const validatedWrappers:Array<Warned<ComponentWrapper>> = VALIDATORS
    .reduce((validated, validator) => validator(validated), wrappers);

  return validatedWrappers.length === 0
    ? undefined
    : validatedWrappers;
}
