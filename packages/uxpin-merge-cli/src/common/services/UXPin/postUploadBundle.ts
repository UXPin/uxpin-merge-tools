import { AxiosResponse } from 'axios';
// tslint:disable-next-line: import-name
import FormData = require('form-data');
import { createReadStream } from 'fs';
import { axiosWithEnhancedError } from '../../../utils/axiosWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

export interface UploadBundleResponse {
  url:string;
}

export async function postUploadBundle(
  domain:string,
  token:string,
  commitHash:string,
  path:string,
):Promise<UploadBundleResponse | null> {
  const formData:FormData = new FormData();
  formData.append('commitHash', commitHash);
  formData.append('bundle', createReadStream(path));

  return axiosWithEnhancedError({
    data: formData,
    headers: {
      ...getAuthHeaders(token),
      ...getUserAgentHeaders(),
      ...formData.getHeaders(),
    },
    method: 'POST',
    responseType: 'json',
    url: `${domain}/code/v/1.0/push/bundle`,
  }).then((response:AxiosResponse) => ((response.data as UploadBundleResponse) || null));
}
