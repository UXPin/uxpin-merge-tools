import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { RequestHandler } from '../RequestHandler';

export class PrepareUploadHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    response.writeHead(OK, {
      'Content-Type': 'text/xml; charset=utf-8',
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });
    response.end();
  }

}

export type DMSBool = 1 | 0;

export interface PrepareUploadFormData {
  add_to_library:DMSBool;
  directory_id:DMSBool;
  file_name:string;
  file_size:number;
  file_type:string;
  id_collection:number;
  no_redirect:DMSBool;
  overwrite:DMSBool;
  resolution:string;
}

export interface UploadFileParams {
  path:string;
}

export interface PrepareUploadResponse {
  file_data:PrepareUploadResponseFileData;
  final_url:string;
  id_stored_file:string;
  message:string;
  params:UploadFileParams;
  status:boolean;
  upload_url:string;
}

export interface PrepareUploadResponseFileData {
  extension:string;
  id_stored_file:string;
  id_tree:string;
  name:string;
  original_name:string;
  path:string;
  resolution:string;
  size:number;
  type:string;
}
