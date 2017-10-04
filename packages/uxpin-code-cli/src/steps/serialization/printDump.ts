import * as stringifyObject from 'stringify-object';
import { stringifyWarnings } from '../../common/warning/stringifyWarnings';
import { ComponentInfo } from '../discovery/components/ComponentInfo';
import { getDesignSystemMetadata } from './getDesignSystemMetadata';

export function printDump(componentInfos:ComponentInfo[]):Promise<void> {
  return getDesignSystemMetadata(componentInfos).then(({ result, warnings }) => {
    console.log(stringifyObject(result));
    console.log(stringifyWarnings(warnings, true));
  });
}
