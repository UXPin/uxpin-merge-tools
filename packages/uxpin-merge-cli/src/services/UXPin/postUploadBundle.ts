import * as FormData from 'form-data';
import { createReadStream } from 'fs';
import { fetch } from '../../utils/fetch/fetch';
import { parseJson } from '../../utils/fetch/parseJson';
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
):Promise<UploadBundleResponse|null> {
  const body:FormData = new FormData();

  body.append('commitHash', commitHash);
  body.append('bundle', createReadStream(path));

  return fetch(`${domain}/code/v/1.0/push/bundle`, {
    body: body as unknown as ReadableStream,
    headers: {
      ...getAuthHeaders(token),
      ...await getUserAgentHeaders(),
    },
    method: 'POST',
  })
    .then((response:Response) => parseJson<UploadBundleResponse>(response));
}
