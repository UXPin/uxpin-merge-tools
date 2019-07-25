import { getWarnedResult } from '../../../common/warning/getWarnedResult';
import { Warned } from '../../../common/warning/Warned';
import { WarningDetails } from '../../../common/warning/WarningDetails';
import { ComponentImplementationInfo } from '../../discovery/component/ComponentInfo';
import { ComponentWrapper } from '../component/wrappers/ComponentWrapper';
import { builtInWrapperValidator } from './wrappers/builtInWrapperValidator';
import { customWrapperPathValidator } from './wrappers/customWrapperPathValidator';

const VALIDATORS:ComponentWrapperValidator[] = [
  builtInWrapperValidator,
  customWrapperPathValidator,
];

export type ComponentWrapperValidator = (
  wrappers:Array<Warned<ComponentWrapper>>,
  implInfo:ComponentImplementationInfo,
) => Array<Warned<ComponentWrapper>>;

export function validateWrappers(
  wrappers:ComponentWrapper[],
  implInfo:ComponentImplementationInfo,
):Warned<ComponentWrapper[]> {
  const warnedWrappers:Array<Warned<ComponentWrapper>> =
    wrappers.map((wrapper:ComponentWrapper) => getWarnedResult(wrapper));

  const result:Array<Warned<ComponentWrapper>> = VALIDATORS
    .reduce((validated, validator) => validator(validated, implInfo), warnedWrappers);

  return getValidWrappersWithWarnings(result);
}

function getValidWrappersWithWarnings(wrappers:Array<Warned<ComponentWrapper>>):Warned<ComponentWrapper[]> {
  const validWrappers:ComponentWrapper[] = [];
  const warnings:WarningDetails[] = [];

  wrappers.forEach((warnedWrapper:Warned<ComponentWrapper>) => {
    if (warnedWrapper.warnings.length === 0) {
      validWrappers.push(warnedWrapper.result);

      return;
    }

    warnings.push(...warnedWrapper.warnings);
  });

  return getWarnedResult(validWrappers, warnings);
}
