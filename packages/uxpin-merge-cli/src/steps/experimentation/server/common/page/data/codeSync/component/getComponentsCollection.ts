import { AllComponentsCollection } from '../../../../../../../../common/types/CodeSyncMetadata';
import { flatMap } from '../../../../../../../../utils/array/flatMap';
import { ComponentDefinition } from '../../../../../../../serialization/component/ComponentDefinition';
import { DesignSystemSnapshot } from '../../../../../../../serialization/DesignSystemSnapshot';
import { getDesignSystemId } from '../getDesignSystemId';
import { getComponentId } from './getComponentId';

export function getComponentsCollection(
  { revisionId, metadata }:ComponentsCollectionInput,
):AllComponentsCollection {
  const designSystemId:string = getDesignSystemId(revisionId);
  const components:ComponentDefinition[] = flatMap(metadata.categorizedComponents, (c) => c.components);
  return components.reduce<AllComponentsCollection>((all, component) => {
    const componentId:string = getComponentId(designSystemId, component.info);
    all[componentId] = {
      componentId,
      info: component.info,
      name: component.name,
      properties: component.properties,
      revisionId,
    };
    return all;
  }, {});
}

export interface ComponentsCollectionInput {
  metadata:DesignSystemSnapshot;
  revisionId:string;
}
