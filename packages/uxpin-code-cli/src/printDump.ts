import * as stringifyObject from 'stringify-object';
import { stringifyWarnings } from './common/warning/stringifyWarnings';
import { getDesignSystemMetadata } from './serialization/getDesignSystemMetadata';

export function printDump():Promise<void> {
  return getDesignSystemMetadata().then(({ result, warnings }) => {
    console.log(stringifyObject(result));
    console.log(stringifyWarnings(warnings, true));
  });
}
