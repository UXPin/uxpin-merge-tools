import { statSync } from 'fs';
import { parse, ParsedPath, resolve } from 'path';
import { getWarnedResult } from '../../../../common/warning/getWarnedResult';
import { Warned } from '../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../discovery/component/ComponentInfo';
import { ComponentWrapper, ComponentWrapperType } from '../../component/wrappers/ComponentWrapper';

export function customWrapperPathValidator(
  wrappers: Array<Warned<ComponentWrapper>>,
  implInfo: ComponentImplementationInfo
): Array<Warned<ComponentWrapper>> {
  return wrappers.map(({ result: wrapper, warnings }: Warned<ComponentWrapper>) => {
    if (wrapper.type === ComponentWrapperType.CUSTOM && !wrapperPathExists(implInfo.path, wrapper.path)) {
      warnings.push({ message: `Invalid wrapper path "${wrapper.path}"!` });
    }

    return getWarnedResult(wrapper, warnings);
  });
}

function wrapperPathExists(baseFilePath: string, pathToResolve: string): boolean {
  const { dir }: ParsedPath = parse(baseFilePath);
  const path: string = resolve(dir, pathToResolve);

  try {
    statSync(path);

    return true;
  } catch (e) {
    return false;
  }
}
