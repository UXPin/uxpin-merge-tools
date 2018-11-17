import { rename } from 'fs-extra';
import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { join } from 'path';
import { parseMultipartFormData } from '../../common/form/parseMultipartFormData';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { handleImplementationError } from '../error/handleImplementationError';
import { RequestHandler } from '../RequestHandler';
import { UPLOAD_DIR_NAME } from './PrepareUploadHandler';

export class UploadHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    this.handleFileUpload(request, response).catch((error) => handleImplementationError(response, error));
  }

  private async handleFileUpload(request:IncomingMessage, response:ServerResponse):Promise<void> {
    await this.handleMultipartFormData(request);
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(request.headers),
    });
    response.write('{}');
    response.end();
  }

  private async handleMultipartFormData(request:IncomingMessage):Promise<void> {
    const { fields, files } = await parseMultipartFormData(request);
    await rename(files.file.path, this.getTargetFilePath(fields.path as string));
  }

  private getTargetFilePath(pathParam:string):string {
    return join(this.context.uxpinDirPath, UPLOAD_DIR_NAME, pathParam);
  }

}
