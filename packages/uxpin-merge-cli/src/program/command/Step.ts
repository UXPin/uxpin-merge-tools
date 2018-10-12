import { DSMetadata } from '../DSMeta';

export interface Step {
  shouldRun:boolean;
  exec:(infos:DSMetadata) => any;
}
