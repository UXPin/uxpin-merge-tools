import { readFile } from 'fs';
import { IncomingMessage, OutgoingHttpHeaders, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { getNoCacheHeaders } from '../../headers/getNoCacheHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { NotFoundHandler } from '../error/NotFoundHandler';
import { RequestHandler } from '../RequestHandler';

export class StaticNoCacheFileHandler implements RequestHandler {
  private notFoundHandler:NotFoundHandler;

  constructor(private context:ExperimentationServerContext, private filePath:string) {
    this.notFoundHandler = new NotFoundHandler();
  }

  public async handle(request:IncomingMessage, response:ServerResponse):Promise<void> {
    response.writeHead(OK, this.getResponseHeaders());
    try {
      const content:Buffer = await this.readFileContent();
      response.end(content,'utf-8');
    } catch (error) {
      this.notFoundHandler.handle(request, response);
    }
  }

  private getResponseHeaders():OutgoingHttpHeaders {
    return {
      'Content-Type': 'application/javascript',
      ...getAccessControlHeaders(this.context.uxpinDomain),
      ...getNoCacheHeaders(),
    };
  }

  private readFileContent():Promise<Buffer> {
    return new Promise((resolve, reject) => {
      readFile(this.filePath, (error, content) => {
        if (error) {
          return reject(error);
        }

        resolve(content);
      });
    });
  }
}
