import { ComponentDefinition } from '../../steps/serialization/component/ComponentDefinition';

export interface ComponentRevision extends ComponentDefinitionPersistedPart {
  componentId:string;
  revisionId:string;
}

export type ComponentDefinitionPersistedPart = Pick<ComponentDefinition, ComponentPersistedProps>;

type ComponentPersistedProps = 'name' | 'info' | 'properties';
