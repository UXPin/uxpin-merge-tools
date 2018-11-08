import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { PageContent, PageData } from '../../../../../common/types/PageData';
import { DesignSystemSnapshot } from '../../../../serialization/DesignSystemSnapshot';
import { getProjectMetadata } from '../../../metadata/getProjectMetadata';
import { Breakpoint, breakpoints } from '../../common/breakpoints/breakpoints';
import { getPageContent } from '../../common/page/content/getPageContent';
import { getPageData } from '../../common/page/data/getPageData';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { getNoCacheHeaders } from '../../headers/getNoCacheHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { RequestHandler } from '../RequestHandler';

interface Page {
  documentationExists:boolean;
  id_page:number;
  is_active:boolean;
  main_version:number;
  name:string;
  parent:number|null;
  sort_order:number;
  version_of:number|null;
  version_type:number;
}

interface Size {
  height:number;
  scrollx:boolean;
  scrolly:boolean;
  width:number;
}

interface MetaData {
  content:string;
  size:Size;
}

interface PreviewPageData {
  canvasData:PageData;
  metaData:MetaData;
}

interface PreviewPagesData {
  [id:number]:PreviewPageData;
}

interface PreviewAllData {
  breakpoints:Breakpoint[];
  pageId:number;
  pages:Page[];
  pagesData:PreviewPagesData;
  redirect:boolean;
}

export class GetPreviewAllDataHandler implements RequestHandler {
  constructor(private context:ExperimentationServerContext) {}

  public async handle(request:IncomingMessage, response:ServerResponse):Promise<void> {
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(request.headers),
      ...getNoCacheHeaders(),
    });
    response.write(JSON.stringify(await this.getPreviewAllData()));
    response.end();
  }

  private async getPreviewAllData():Promise<PreviewAllData> {
    const { epid, port, uxpinDirPath } = this.context;
    const metadata:DesignSystemSnapshot = await getProjectMetadata(uxpinDirPath);
    const pageContent:PageContent = await getPageContent(uxpinDirPath);
    const pageData:PageData = getPageData({ metadata, pageContent, port, revisionId: epid.revisionId });

    const breakpointId:number = 0;
    const pageId:number = 1;
    const width:number = breakpoints[breakpointId].width;
    const height:number = breakpoints[breakpointId].height;

    return {
      breakpoints,
      pageId,
      pages: [{
        documentationExists: false,
        id_page: pageId,
        is_active: true,
        main_version: breakpointId,
        name: 'Experiment',
        parent: null,
        sort_order: 0,
        version_of: null,
        version_type: breakpointId,
      }],
      pagesData: {
        [pageId]: {
          canvasData: pageData,
          metaData: {
            content: `/api/projects/${this.context.epid}/pages/${pageId}/content`,
            size: { width, height, scrollx: false, scrolly: false },
          },
        },
      },
      redirect: false,
    };
  }
}
