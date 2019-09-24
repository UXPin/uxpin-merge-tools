import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { getNoCacheHeaders } from '../../headers/getNoCacheHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { RequestHandler } from '../RequestHandler';

export class GetInfoHandler implements RequestHandler {
  constructor(private context:ExperimentationServerContext) {}

  public async handle(request:IncomingMessage, response:ServerResponse):Promise<void> {
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(request.headers),
      ...getNoCacheHeaders(),
    });
    response.write(await this.getInfoResponse());
    response.end();
  }

  private async getInfoResponse():Promise<string> {
    const commitHash:string = getCommitHash(this.context.epid.revisionId);
    const date:Date = new Date();

    const response:CodeInfoResponse = {
      lastUpdate: {
        commitHash,
        time: date.toISOString(),
      },
    };

    return JSON.stringify(response);
  }
}

function getCommitHash(revision:string):string {
  const [commitHash] = revision.split('_').reverse();

  return commitHash;
}

interface CodeInfoResponse {
  lastUpdate:CodeLibraryLastUpdate;
}

interface CodeLibraryLastUpdate {
  commitHash:string;
  time:string;
}
