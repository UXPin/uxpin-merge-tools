import { CodeSyncMetadata } from './CodeSyncMetadata';

export interface PageData {
  code_sync?: Partial<CodeSyncMetadata> | { presets: never[]; components: never[] };
  component_version: any;
  components?: { [componentId: number]: PageContent };
  components_ids?: string[];
  components_master_ids?: number[];
  components_nested_versions?: { [componentId: number]: string };
  components_versions?: number[];
  components_versions_map?: number[];
  is_component?: string;
  last_update: string | number;
  page: PageContent;
}

export interface PageContent {
  canvas: {
    props: {
      storedElements: string[];
      [name: string]: any;
    };
    type: 'Canvas';
    v: string | number;
  };

  [elementId: string]: any;
}
