import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { PageData } from '../../../../../common/types/PageData';
import { PreviewAllData } from '../../../../../common/types/PreviewAllData';
import { breakpoints } from '../../common/breakpoints/breakpoints';
import { getPageData } from '../../common/page/data/getPageData';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { getNoCacheHeaders } from '../../headers/getNoCacheHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { handleImplementationError } from '../error/handleImplementationError';
import { RequestHandler } from '../RequestHandler';

export class GetPreviewAllDataHandler implements RequestHandler {
  constructor(private context:ExperimentationServerContext) {}

  public async handle(request:IncomingMessage, response:ServerResponse):Promise<void> {
    this.respondWithPreviewAllData(request, response).catch((err) => handleImplementationError(response, err));
  }

  private async respondWithPreviewAllData(request:IncomingMessage, response:ServerResponse):Promise<void> {
    const body:string = JSON.stringify(await this.getPreviewAllData());
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(request.headers),
      ...getNoCacheHeaders(),
    });
    response.write(body);
    response.end();
  }

  private async getPreviewAllData():Promise<PreviewAllData> {
    const pageData:PageData = await this.getPageData();

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
            content: `/api/projects/${this.context.epid.revisionId}/pages/${pageId}/content`,
            size: { width, height, scrollx: false, scrolly: false },
          },
        },
      },
      redirect: false,
    };
  }

  private async getPageData():Promise<PageData> {
    const { epid, ngrokSessionId, port, uxpinDirPath } = this.context;
    return await getPageData({ ngrokSessionId, port, revisionId: epid.revisionId, uxpinDirPath });
  }
}
