import { getJavaScriptComponentPath } from '../../../../../../../test/utils/resources/getExampleComponentPath';
import { ComponentImplementationInfo } from '../../../../../../steps/discovery/component/ComponentInfo';
import { FrameworkNames } from '../../../../../frameworkNames';

export function getImplementation(componentName:string):ComponentImplementationInfo {
  return {
    framework: FrameworkNames.reactjs,
    lang: 'javascript',
    path: getJavaScriptComponentPath(componentName),
  };
}
