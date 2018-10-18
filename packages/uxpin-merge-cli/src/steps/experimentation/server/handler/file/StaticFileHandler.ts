import { IncomingMessage, OutgoingHttpHeaders, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { readFileFromPath } from '../../../../../utils/fs/readFileFromPath';
import { NotFoundHandler } from '../error/NotFoundHandler';
import { RequestHandler } from '../RequestHandler';

export class StaticFileHandler implements RequestHandler {
  private notFoundHandler:NotFoundHandler;

  constructor(
    private filePath:string,
    private headers:OutgoingHttpHeaders = {}) {
    this.notFoundHandler = new NotFoundHandler();
  }

  public async handle(request:IncomingMessage, response:ServerResponse):Promise<void> {
    response.writeHead(OK, this.headers);
    try {
      const content:Buffer = await this.readFileContent();
      response.end(content, 'utf-8');
    } catch (error) {
      this.notFoundHandler.handle(request, response);
    }
  }

  private readFileContent():Promise<Buffer> {
    return readFileFromPath(this.filePath);
  }
}
