import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { flatMap } from 'lodash';
import { getComponentNamespacedName } from '../../../../serialization/component/name/getComponentNamespacedName';
import { DesignSystemSnapshot } from '../../../../serialization/DesignSystemSnapshot';
import { getProjectMetadata } from '../../../metadata/getProjectMetadata';
import { getComponentId } from '../../common/page/data/codeSync/component/getComponentId';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { getNoCacheHeaders } from '../../headers/getNoCacheHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { EXPERIMENTAL_LIBRARY_ID } from '../libraries/GetLibrariesHandler';
import { RequestHandler } from '../RequestHandler';

export const PREVIEW_ITEM_TYPE:'code-sync-component' = 'code-sync-component';

export class GetPreviewsHandler implements RequestHandler {
  constructor(private context:ExperimentationServerContext) {}

  public async handle(request:IncomingMessage, response:ServerResponse):Promise<void> {
    response.writeHead(OK, {
      'Content-type': 'application/json',
      ...getAccessControlHeaders(request.headers),
      ...getNoCacheHeaders(),
    });
    response.write(await this.getPreviewResponse());
    response.end();
  }

  private async getPreviewResponse():Promise<string> {
    const metadata:DesignSystemSnapshot = await this.getMetadata();
    const [designSystemId] = this.context.epid.revisionId.split('_');

    const response:SinglePreviewResponse[] = flatMap(metadata.categorizedComponents, (category, index) => {
      const idCategory:number = index + 1;
      return category.components.map<SinglePreviewResponse>((component) => ({
        id: getComponentId(designSystemId, component.info),
        idCategory,
        idLibrary: EXPERIMENTAL_LIBRARY_ID,
        name: getComponentNamespacedName(component),
        revisionId: this.context.epid.revisionId,
        type: PREVIEW_ITEM_TYPE,
      }));
    });

    return JSON.stringify(response);
  }

  private async getMetadata():Promise<DesignSystemSnapshot> {
    return getProjectMetadata(this.context.uxpinDirPath);
  }
}

interface SinglePreviewResponse {
  id:string;
  idCategory:number;
  idLibrary:number;
  name:string;
  revisionId:string;
  type:typeof PREVIEW_ITEM_TYPE;
}
