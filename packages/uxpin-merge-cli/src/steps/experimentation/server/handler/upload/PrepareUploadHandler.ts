import { ensureDir, mkdir, readdir, writeJson } from 'fs-extra';
import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { join, parse, ParsedPath } from 'path';
import { prepareDataFromPayload } from '../../common/payload/prepareDataFromPayload';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { handleImplementationError } from '../error/handleImplementationError';
import { ParsedFormData } from '../page/save/PageSaveHandler';
import { RequestHandler } from '../RequestHandler';
import { getUploadMetadataPath } from './getUploadMetadataPath';
import { PrepareUploadFormData } from './PrepareUploadFormData';
import { PrepareUploadResponse } from './PrepareUploadResponse';
import { UploadItemMetadata } from './UploadItemMetadata';

export const UPLOAD_DIR_NAME:string = 'user-upload';
export const UPLOAD_METADATA_FILE_NAME:string = 'upload-metadata.json';

export class PrepareUploadHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    this.handlePrepareUpload(request, response).catch((error) => handleImplementationError(response, error));
  }

  private async handlePrepareUpload(request:IncomingMessage, response:ServerResponse):Promise<void> {
    const requestPayload:PrepareUploadFormData = await prepareDataFromPayload(request);
    const fileId:string = await this.createFileId();
    await this.writeMetadata(fileId, requestPayload);
    const responseBody:string = JSON.stringify(await this.getResponseData(fileId, requestPayload));
    response.writeHead(OK, {
      'Content-Type': 'text/xml; charset=utf-8',
      ...getAccessControlHeaders(request.headers),
    });
    response.end(responseBody);
  }

  private async getResponseData(fileId:string, uploadDetails:PrepareUploadFormData):Promise<PrepareUploadResponse> {
    const parsedName:ParsedPath = parse(uploadDetails.file_name);
    return {
      file_data: {
        extension: parsedName.ext.split('.')[1],
        id_stored_file: fileId,
        id_tree: '1',
        name: parsedName.name,
        original_name: uploadDetails.file_name,
        path: `${fileId}/`,
        resolution: uploadDetails.resolution,
        size: uploadDetails.file_size,
        type: uploadDetails.file_type,
      },
      final_url: this.getFinalFileUrl(fileId, uploadDetails.file_name),
      id_stored_file: fileId,
      message: '',
      params: {
        path: `${fileId}/${uploadDetails.file_name}`,
      },
      status: true,
      upload_url: this.getUploadUrl(),
    };
  }

  private getFinalFileUrl(fileId:string, fileName:string):string {
    const { port } = this.context;
    return `http://localhost:${port}/upload/${fileId}/${fileName}`;
  }

  private getUploadUrl():string {
    const { port } = this.context;
    return `http://localhost:${port}/upload`;
  }

  private async createFileId():Promise<string> {
    const uploadDirPath:string = join(this.context.uxpinDirPath, UPLOAD_DIR_NAME);
    await ensureDir(uploadDirPath);
    const dirContents:string[] = await readdir(uploadDirPath);
    const dirContentsAsNumbers:number[] = dirContents.map((n) => parseInt(n, 10));
    const newId:string = (Math.max(0, ...dirContentsAsNumbers) + 1).toString();
    await mkdir(join(uploadDirPath, newId));
    return newId;
  }

  private async writeMetadata(fileId:string, uploadDetails:PrepareUploadFormData):Promise<void> {
    const metadata:UploadItemMetadata = {
      contentType: uploadDetails.file_type,
      fileName: uploadDetails.file_name,
    };
    const metadataPath:string = getUploadMetadataPath(this.context.uxpinDirPath, fileId);
    await writeJson(metadataPath, metadata);
  }

}
