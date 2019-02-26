import { NO_CONTENT } from 'http-status-codes';
import { StubbyStub } from 'stubby';

export function getStubUploadBundle():StubbyStub {
  return {
    request: {
      method: 'POST',
      url: /^\/code\/v\/1\.0\/push\/bundle/,
    },
    response: {
      body: '',
      headers: {
        'content-type': 'application/json',
      },
      status: NO_CONTENT,
    },
  };
}
