import { PageContent } from './PageData';

export type DeletedElements = { [elementId:string]:true } | never[];

export interface PageIncrementalUpdate {
  can_break_cohesion?:boolean;
  changed_elements:Partial<PageContent>;
  comet_thread_id?:string;
  components_used?:any;
  deleted_elements:DeletedElements;
  design_system_used?:any;
  id_page:number | string;
  id_project:number | string;
  id_save:string;
  is_component?:'0' | '1';
}
