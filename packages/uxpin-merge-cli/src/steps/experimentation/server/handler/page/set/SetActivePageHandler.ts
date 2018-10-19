import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import {
  AllComponentsCollection,
  AllPresetsCollection,
  CodeSyncMetadata,
} from '../../../../../../common/types/CodeSyncMetadata';
import { PageData } from '../../../../../../common/types/PageData';
import { DesignSystemSnapshot } from '../../../../../serialization/DesignSystemSnapshot';
import { getProjectMetadata } from '../../../../metadata/getProjectMetadata';
import { getAccessControlHeaders } from '../../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../../startExperimentationServer';
import { ImplementationErrorHandler } from '../../error/ImplementationErrorHandler';
import { RequestHandler } from '../../RequestHandler';

export class SetActivePageHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    this.respondWithPageContent(response).catch((error) => {
      new ImplementationErrorHandler(error).handle(request, response);
    });
  }

  private async respondWithPageContent(response:ServerResponse):Promise<void> {
    const body:string = JSON.stringify(await this.getPageContent());
    response.writeHead(OK, {
      'Content-Type': 'text/xml; charset=utf-8',
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });
    response.write(body);
    response.end();
  }

  private async getPageContent():Promise<PageData> {
    return {
      code_sync: await this.getCodeSyncMetadata(),
      component_version: null,
      components_master_ids: [],
      components_versions: [],
      components_versions_map: [],
      is_component: '0',
      last_update: '0',
      page: {
        canvas: {
          props: { storedElements: [] },
          type: 'Canvas',
          v: '2.0',
        },
      },
    };
  }

  private async getCodeSyncMetadata():Promise<CodeSyncMetadata> {
    const { epid, port, uxpinDirPath } = this.context;
    const metadata:DesignSystemSnapshot = await getProjectMetadata(uxpinDirPath);
    return {
      bundles: {
        [epid.revisionId]: `http://localhost:${port}/code/library.js`,
      },
      components: this.getComponentsCollection(metadata),
      presets: this.getPresetsCollection(metadata),
    };
  }

  private getComponentsCollection(metadata:DesignSystemSnapshot):AllComponentsCollection {
    return {};
  }

  private getPresetsCollection(metadata:DesignSystemSnapshot):AllPresetsCollection {
    return {};
  }
}
