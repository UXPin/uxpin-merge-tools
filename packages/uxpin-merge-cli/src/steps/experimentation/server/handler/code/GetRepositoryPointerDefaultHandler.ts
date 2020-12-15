import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { DEFAULT_BRANCH_NAME, DEFAULT_REPO_POINTER_TYPE } from '../../../../../common/constants';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { getNoCacheHeaders } from '../../headers/getNoCacheHeaders';
import { RequestHandler } from '../RequestHandler';
import { ExperimentationServerContext } from '../../startExperimentationServer';

const DEFAULT_REPO_POINTER_METADATA = {
  name: DEFAULT_BRANCH_NAME,
  type: DEFAULT_REPO_POINTER_TYPE,
};

/**
 * Handle requests for the repositoryPointer/default
 * which normally returns the default pointerName to use
 *
 * In non-experimental mode this will return the project metadata that the server was started with
 *
 */
// tslint:disable prefer-function-over-method
export class GetRepositoryPointerDefaultHandler implements RequestHandler {
  constructor(private context:ExperimentationServerContext) {}

  public handle(request:IncomingMessage, response:ServerResponse):void {
    // Always return the current: Get the default commit
    const pointer = {...DEFAULT_REPO_POINTER_METADATA};
    if (this.context.projectMetadata && this.context.projectMetadata.vcs) {
      pointer.name = this.context.projectMetadata.vcs.branchName;
    }

    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(request.headers),
      ...getNoCacheHeaders(),
    });

    response.write(pointer);

    response.end();
  }
}
