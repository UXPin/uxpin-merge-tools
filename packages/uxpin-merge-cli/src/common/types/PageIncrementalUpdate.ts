import { PageContent } from './PageData';

export type DeletedElements = { [elementId:string]:true } | never[];

export interface PageIncrementalUpdate {
  can_break_cohesion?:boolean;
  changed_elements:Partial<PageContent>;
  comet_thread_id?:string;
  deleted_elements:DeletedElements;
  id_page:number | string;
  id_project:number | string;
  is_component?:'0' | '1';
  design_system_used?:any;
  components_used?:any;
}
