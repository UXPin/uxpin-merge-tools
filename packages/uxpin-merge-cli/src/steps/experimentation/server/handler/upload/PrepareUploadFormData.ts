export type DMSBool = 1 | 0;

export interface PrepareUploadFormData {
  add_to_library: DMSBool;
  directory_id: DMSBool;
  file_name: string;
  file_size: number;
  file_type: string;
  id_collection: number;
  no_redirect: DMSBool;
  overwrite: DMSBool;
  resolution: string;
}
