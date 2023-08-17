import { flatMap } from 'lodash';
import { AllComponentsCollection } from '../../../../../../../../common/types/CodeSyncMetadata';
import { ComponentDefinition } from '../../../../../../../serialization/component/ComponentDefinition';
import { DesignSystemSnapshot } from '../../../../../../../serialization/DesignSystemSnapshot';
import { getDesignSystemId } from '../getDesignSystemId';
import { getComponentId } from './getComponentId';

export function getComponentsCollection({ revisionId, metadata }: ComponentsCollectionInput): AllComponentsCollection {
  const designSystemId: string = getDesignSystemId(revisionId);
  const components: ComponentDefinition[] = flatMap(metadata.categorizedComponents, (c) => c.components);
  return components.reduce<AllComponentsCollection>((all, component) => {
    const componentId: string = getComponentId(designSystemId, component.info);
    all[componentId] = {
      componentId,
      description: component.description,
      info: component.info,
      name: component.name,
      namespace: component.namespace,
      properties: component.properties,
      revisionId,
      usePortal: component.usePortal,
      wrappers: component.wrappers,
    };
    return all;
  }, {});
}

export interface ComponentsCollectionInput {
  metadata: DesignSystemSnapshot;
  revisionId: string;
}
