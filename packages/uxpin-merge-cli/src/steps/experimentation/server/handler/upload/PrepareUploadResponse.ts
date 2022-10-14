export interface UploadFileParams {
  path: string;
}

export interface PrepareUploadResponseFileData {
  extension: string;
  id_stored_file: string;
  id_tree: string;
  name: string;
  original_name: string;
  path: string;
  resolution: string;
  size: number;
  type: string;
}

export interface PrepareUploadResponse {
  file_data: PrepareUploadResponseFileData;
  final_url: string;
  id_stored_file: string;
  message: string;
  params: UploadFileParams;
  status: boolean;
  upload_url: string;
}
