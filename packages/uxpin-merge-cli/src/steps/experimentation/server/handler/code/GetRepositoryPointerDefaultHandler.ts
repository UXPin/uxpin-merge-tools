import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { RepositoryPointerType } from '../../../../../../src/common/RepositoryPointerType';
import { DEFAULT_BRANCH_NAME } from '../../../../../common/constants';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { getNoCacheHeaders } from '../../headers/getNoCacheHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { RequestHandler } from '../RequestHandler';

export interface RepoPointerNameAndType {
  name: string;
  type: RepositoryPointerType;
}

const DEFAULT_REPO_POINTER_METADATA: RepoPointerNameAndType = {
  name: DEFAULT_BRANCH_NAME,
  type: RepositoryPointerType.Branch,
};

/**
 * Handle requests for the repositoryPointer/default
 * which normally returns the default pointerName to use
 *
 * In non-experimental mode this will return the project metadata that the server was started with
 *
 */
export class GetRepositoryPointerDefaultHandler implements RequestHandler {
  constructor(private context: ExperimentationServerContext) {}

  public handle(request: IncomingMessage, response: ServerResponse): void {
    // Always return the current: Get the default commit
    const pointer: RepoPointerNameAndType = { ...DEFAULT_REPO_POINTER_METADATA };
    if (this.context.projectMetadata && this.context.projectMetadata.vcs) {
      pointer.name = this.context.projectMetadata.vcs.branchName;
    }

    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(request.headers),
      ...getNoCacheHeaders(),
    });

    response.write(JSON.stringify(pointer));

    response.end();
  }
}
