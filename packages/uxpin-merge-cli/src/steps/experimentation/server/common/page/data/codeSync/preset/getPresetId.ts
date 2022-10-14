import * as v5 from 'uuid/v5';

export function getPresetId(designSystemId: string, presetPath: string): string {
  return v5(presetPath, designSystemId);
}
