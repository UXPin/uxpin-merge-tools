import { PageContent } from './PageData';

export interface PageIncrementalUpdate {
  can_break_cohesion?:boolean;
  changed_elements:Partial<PageContent>;
  comet_thread_id?:string;
  deleted_elements:{ [elementId:string]:true } | never[];
  id_page:number | string;
  id_project:number | string;
  is_component?:'0' | '1';
  design_system_used?:any;
  components_used?:any;
}
