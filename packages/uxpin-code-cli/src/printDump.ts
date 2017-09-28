import * as stringifyObject from 'stringify-object';
import { getDesignSystemMetadata } from './serialization/getDesignSystemMetadata';

export function printDump():Promise<void> {
  return getDesignSystemMetadata()
    .then(stringifyObject)
    .then(console.log);
}
