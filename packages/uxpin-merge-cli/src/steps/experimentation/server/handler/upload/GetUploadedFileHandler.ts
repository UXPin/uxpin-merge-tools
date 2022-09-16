import { readFile, readJson } from 'fs-extra';
import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { join } from 'path';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { handleImplementationError } from '../error/handleImplementationError';
import { RequestHandler } from '../RequestHandler';
import { getUploadMetadataPath } from './getUploadMetadataPath';
import { UPLOAD_DIR_NAME } from './PrepareUploadHandler';
import { UploadItemMetadata } from './UploadItemMetadata';

export class GetUploadedFileHandler implements RequestHandler {
  constructor(private context: ExperimentationServerContext) {}

  public handle(request: IncomingMessage, response: ServerResponse, uriParams: string[]): void {
    this.handleGetUploadedFile(request, response, uriParams).catch((error) => {
      handleImplementationError(response, error);
    });
  }

  private async handleGetUploadedFile(
    request: IncomingMessage,
    response: ServerResponse,
    [fileId]: string[]
  ): Promise<void> {
    const uploadMetadata: UploadItemMetadata = await this.getUploadFileMetadata(fileId);
    const filePath: string = this.getUploadedFilePath(fileId, uploadMetadata.fileName);
    const fileBuffer: Buffer = await readFile(filePath);
    response.writeHead(OK, {
      'Content-Type': uploadMetadata.contentType,
      ...getAccessControlHeaders(request.headers),
    });
    response.end(fileBuffer);
  }

  private getUploadedFilePath(fileId: string, fileName: string): string {
    return join(this.context.uxpinDirPath, UPLOAD_DIR_NAME, fileId, fileName);
  }

  private getUploadFileMetadata(fileId: string): Promise<UploadItemMetadata> {
    return readJson(getUploadMetadataPath(this.context.uxpinDirPath, fileId));
  }
}
