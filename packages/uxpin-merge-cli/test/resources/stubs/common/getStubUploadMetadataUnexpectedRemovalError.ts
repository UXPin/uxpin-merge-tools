import { BAD_REQUEST } from 'http-status-codes';
import { StubbyStub } from 'stubby';
import { PushError } from '../../../../src/common/services/UXPin/postPushMetadata';

export function getStubUploadMetadataUnexpectedRemovalError():StubbyStub {
  return {
    request: {
      method: 'POST',
      url: /^\/code\/v\/1\.0\/push$/,
    },
    response: {
      body: JSON.stringify({
        error: 'Bad Request',
        errorCode: PushError.COMPONENT_OR_PRESET_REMOVAL,
        message: `Push failed
You can’t make this push because removing the following components may break the prototypes made in UXPin.

src/Card/Card.js`,
        statusCode: BAD_REQUEST,
      }),
      headers: {
        'content-type': 'application/json',
      },
      status: BAD_REQUEST,
    },
  };
}
