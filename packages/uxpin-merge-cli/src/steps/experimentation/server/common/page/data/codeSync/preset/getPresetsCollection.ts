import { flatMap } from 'lodash';
import { AllPresetsCollection } from '../../../../../../../../common/types/CodeSyncMetadata';
import { ComponentPresetRevision } from '../../../../../../../../common/types/ComponentPresetRevision';
import { DesignSystemSnapshot } from '../../../../../../../serialization/DesignSystemSnapshot';
import { getComponentId } from '../component/getComponentId';
import { getComponentRevisionId } from '../component/getComponentRevisionId';
import { getDesignSystemId } from '../getDesignSystemId';
import { getPresetId } from './getPresetId';

export function getPresetsCollection(
  { metadata, revisionId }:PresetsCollectionInput,
):AllPresetsCollection {
  const designSystemId:string = getDesignSystemId(revisionId);
  const presets:ComponentPresetRevision[] = flatMap(metadata.categorizedComponents, (category) => {
    return flatMap(category.components, (component) => {
      const componentId:string = getComponentId(designSystemId, component.info);
      return component.presets.map<ComponentPresetRevision>((preset, index) => {
        return {
          ...preset,
          componentRevisionId: getComponentRevisionId(revisionId, componentId),
          presetId: getPresetId(designSystemId, component, preset),
          sortIndex: index,
        };
      });
    });
  });
  return presets.reduce<AllPresetsCollection>((all, preset) => {
    all[preset.presetId] = preset;
    return all;
  }, {});
}

export interface PresetsCollectionInput {
  metadata:DesignSystemSnapshot;
  revisionId:string;
}
