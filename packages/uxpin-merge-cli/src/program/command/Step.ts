import { DSMetadata } from '../DSMeta';

export interface Step {
  shouldRun:boolean;
  exec:(infos:DSMetadata) => any;
}

export type StepExecutor = (designSystem:DSMetadata) => Promise<DSMetadata>;

export type StepWithoutDSExecutor = () => Promise<void>;
