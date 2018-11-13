import { readdir, readFile } from 'fs-extra';
import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { join } from 'path';
import { parse } from 'url';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { handleImplementationError } from '../error/handleImplementationError';
import { RequestHandler } from '../RequestHandler';
import { UPLOAD_DIR_NAME } from './PrepareUploadHandler';

export class GetUploadedFileHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    this.getUploadedFile(request, response).catch((error) => handleImplementationError(response, error));
  }

  private async getUploadedFile(request:IncomingMessage, response:ServerResponse):Promise<void> {
    const fileId:string = parse(request.url!, true).query.id;
    const filePath:string = await this.getUploadedFilePath(fileId);
    const fileBuffer:Buffer = await readFile(filePath);
    response.writeHead(OK, {
      'Content-Type': 'image/png',
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });
    response.end(fileBuffer);
  }

  private async getUploadedFilePath(fileId:string):Promise<string> {
    const uploadDirPath:string = join(this.context.uxpinDirPath, UPLOAD_DIR_NAME, fileId);
    const dirContents:string[] = await readdir(uploadDirPath);
    return join(uploadDirPath, dirContents[0]);
  }
}
