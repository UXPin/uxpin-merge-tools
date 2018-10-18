import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { EPID } from '../../../epid/EPID';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { RequestHandler } from '../RequestHandler';

export class GetLibrariesHandler implements RequestHandler {
  constructor(private context:ExperimentationServerContext) {
  }

  public async handle(request:IncomingMessage, response:ServerResponse):Promise<void> {
    const projectEPID:EPID = this.context.epid;
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });

    response.write(JSON.stringify([
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
        hash: projectEPID.revisionId,
        id: projectEPID.revisionId,
        idAccount: -1,
        idClient: null,
        idUser: -1,
        insertDate: new Date(),
        lastSketchSyncDate: null,
        name: 'UXPin Merge - Experiment Mode',
        type: 'code-sync',
      },
    ]));

    response.end();
  }
}
