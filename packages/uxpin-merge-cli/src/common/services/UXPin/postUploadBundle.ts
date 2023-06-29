import { AxiosResponse } from 'axios';
import debug from 'debug';
import * as FormData from 'form-data';
import prettyBytes = require('pretty-bytes');
import { createReadStream, statSync } from 'fs';

import { axiosWithEnhancedError } from '../../../utils/axiosWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

const log = debug('uxpin');

export interface UploadBundleResponse {
  url: string;
}

export async function postUploadBundle(
  domain: string,
  token: string,
  commitHash: string,
  path: string
): Promise<UploadBundleResponse | null> {
  const formData: FormData = new FormData();

  formData.append('commitHash', commitHash);
  log('Uploading', getFileSize(path), path);
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
  }).then((response: AxiosResponse) => (response.data as UploadBundleResponse) || null);
}

function getFileSize(filepath: string) {
  const stats = statSync(filepath);
  const sizeInBytes = stats.size;
  const humanReadableSize = prettyBytes(sizeInBytes);
  return humanReadableSize;
}
