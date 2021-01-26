import { ComponentDefinition } from '../ComponentDefinition';

export function isStorybookComponent(def:ComponentDefinition):boolean {
  return def && def.info
    && def.info.implementation
    && (def.info.implementation.path.endsWith('stories.js') || def.info.implementation.path.endsWith('stories.ts'));
}
