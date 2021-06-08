import { getJavaScriptComponentPath } from '../../../../../../../../test/utils/resources/getExampleComponentPath';
import { FrameworkNames } from '../../../../../../../framework/frameworkNames';
import { ComponentImplementationInfo } from './../../../../../../discovery/component/ComponentInfo';

export function getImplementation(componentName:string):ComponentImplementationInfo {
  return {
    framework: FrameworkNames.reactjs,
    lang: 'javascript',
    path: getJavaScriptComponentPath(componentName),
  };
}
