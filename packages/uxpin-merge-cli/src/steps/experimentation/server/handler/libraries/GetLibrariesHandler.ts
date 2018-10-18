import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { DesignSystemSnapshot } from '../../../../serialization/DesignSystemSnapshot';
import { getProjectMetadata } from '../../../metadata/getProjectMetadata';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { RequestHandler } from '../RequestHandler';

const LIBRARY_DEFAULT_NAME:string = 'UXPin Merge - Experiment Mode';

export class GetLibrariesHandler implements RequestHandler {
  constructor(private context:ExperimentationServerContext) {}

  public async handle(request:IncomingMessage, response:ServerResponse):Promise<void> {
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });
    response.write(await this.getLibrariesContent());
    response.end();
  }

  private async getLibrariesContent():Promise<string> {
    const metadata:DesignSystemSnapshot = await this.getMetadata();
    return JSON.stringify([
      {
        _links: {
          categories: {
            href: '/components/categories',
            templated: false,
          },
          items: {
            href: '/components/previews',
            templated: false,
          },
          pointer: {
            href: '/repositoryPointer',
            templated: false,
          },
        },
        accessScope: {
          scopeGroup: 'account',
          selectedUsers: [],
        },
        editScope: {
          scopeGroup: 'account',
          selectedUsers: [],
        },
        hasDesignSystem: false,
        hash: this.context.epid.revisionId,
        id: -1,
        idAccount: -1,
        idClient: null,
        idUser: -1,
        insertDate: new Date(),
        lastSketchSyncDate: null,
        name: metadata.name || LIBRARY_DEFAULT_NAME,
        type: 'code-sync',
      },
    ]);
  }

  private async getMetadata():Promise<DesignSystemSnapshot> {
    return getProjectMetadata(this.context.uxpinDirPath);
  }
}