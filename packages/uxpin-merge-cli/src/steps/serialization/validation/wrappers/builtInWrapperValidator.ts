import { getWarnedResult } from '../../../../common/warning/getWarnedResult';
import { Warned } from '../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../discovery/component/ComponentInfo';
import { ComponentWrapper, ComponentWrapperType } from '../../component/wrappers/ComponentWrapper';
import { isBuiltInWrapper } from '../../component/wrappers/isBuiltInWrapper';

export function builtInWrapperValidator(
  wrappers:Array<Warned<ComponentWrapper>>,
  implInfo:ComponentImplementationInfo,
):Array<Warned<ComponentWrapper>> {
  return wrappers.map(({ result: wrapper, warnings }:Warned<ComponentWrapper>) => {
    if (wrapper.type === ComponentWrapperType.BUILT_IN && !isBuiltInWrapper(wrapper.name)) {
      warnings.push({ message: `Unknown built in wrapper "${wrapper.name}"!` });
    }

    if (wrapper.type !== ComponentWrapperType.BUILT_IN && isBuiltInWrapper(wrapper.name)) {
      warnings.push({ message: `"${wrapper.name}" is a reserved name for built in validators!` });
    }

    return getWarnedResult(wrapper, warnings);
  });
}
