import { Breakpoint } from '../../steps/experimentation/server/common/breakpoints/breakpoints';
import { PageData } from './PageData';

interface PageTreeItem {
  documentationExists:boolean;
  id_page:number;
  is_active:boolean;
  main_version:number;
  name:string;
  parent:number | null;
  sort_order:number;
  version_of:number | null;
  version_type:number;
}

interface PageSize {
  height:number;
  scrollx:boolean;
  scrolly:boolean;
  width:number;
}

interface PageMetadata {
  content:string;
  size:PageSize;
}

interface PreviewPageData {
  canvasData:PageData;
  metaData:PageMetadata;
}

interface PreviewPagesData {
  [id:number]:PreviewPageData;
}

export interface PreviewAllData {
  breakpoints:Breakpoint[];
  pageId:number;
  pages:PageTreeItem[];
  pagesData:PreviewPagesData;
  redirect:boolean;
}
