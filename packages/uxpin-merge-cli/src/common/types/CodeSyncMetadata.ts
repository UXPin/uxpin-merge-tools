import { ComponentPresetRevision } from './ComponentPresetRevision';
import { ComponentRevision } from './ComponentRevision';

export interface CodeSyncMetadata {
  components:AllComponentsCollection;
  presets:AllPresetsCollection;
  bundles:AllBundlesCollection;
}

export interface AllComponentsCollection {
  [componentId:string]:ComponentRevision;
}

export interface AllPresetsCollection {
  [presetId:string]:ComponentPresetRevision;
}

export interface AllBundlesCollection {
  [fetchRevisionId:string]:string;
}
