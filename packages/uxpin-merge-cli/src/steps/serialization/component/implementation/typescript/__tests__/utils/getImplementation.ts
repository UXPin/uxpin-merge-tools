import { getTypeScriptComponentPath } from '../../../../../../../../test/utils/resources/getExampleComponentPath';
import { ComponentImplementationInfo } from '../../../../../../discovery/component/ComponentInfo';

export function getImplementation(componentName: string): ComponentImplementationInfo {
  return {
    framework: 'reactjs',
    lang: 'typescript',
    path: getTypeScriptComponentPath(componentName),
  };
}
