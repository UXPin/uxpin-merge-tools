import { CodeSyncMetadata } from './CodeSyncMetadata';

export interface PageData {
  page:PageContent;
  last_update:string | number;
  component_version:any;
  is_component?:string;
  components_master_ids?:number[];
  components_versions?:number[];
  components_versions_map?:number[];
  code_sync?:Partial<CodeSyncMetadata> | { presets:never[], components:never[] };
  components?:{ [componentId:number]:PageContent };
  components_ids?:string[];
  components_nested_versions?:{ [componentId:number]:string };
}

interface PageContent {
  canvas:{
    props:{
      storedElements:string[];
      [name:string]:any;
    };
    type:'Canvas',
    v:string | number;
  };

  [elementId:string]:any;
}
