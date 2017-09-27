import pAny = require('p-any');
import { ComponentImplementationInfo } from '../ComponentInfo';
import { ComponentPaths } from '../ComponentPaths';
import { getJSImplementationInfo } from './strategies/getJSImplementationInfo';
import { getTSImplementationInfo } from './strategies/getTSImplementationInfo';

type ImplementationDiscoveryStrategy = (paths:ComponentPaths, name:string) => Promise<ComponentImplementationInfo>;

const STRATEGIES:ImplementationDiscoveryStrategy[] = [
  getTSImplementationInfo,
  getJSImplementationInfo,
];

export function getImplementationInfo(paths:ComponentPaths, componentName:string):Promise<ComponentImplementationInfo> {
  return pAny(STRATEGIES.map((strategy) => strategy(paths, componentName)));
}
