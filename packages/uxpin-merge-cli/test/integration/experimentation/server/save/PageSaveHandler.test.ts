import { readJson } from 'fs-extra';
import { OK } from 'http-status-codes';
import { join } from 'path';
import { Response } from 'request';
import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import { PageContent } from '../../../../../src/common/types/PageData';
import { PageIncrementalUpdate } from '../../../../../src/common/types/PageIncrementalUpdate';
import { TEMP_DIR_NAME } from '../../../../../src/steps/building/config/getConfig';
import { PAGE_FILE_NAME } from '../../../../../src/steps/experimentation/server/handler/page/save/PageSaveHandler';
import { setTimeoutBeforeAll } from '../../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../../utils/experimentation/setupExperimentationServerTest';
import { addSecondElementRequestPayload } from './fixtures/addSecondElementRequestPayload';
import { createFirstElementRequestPayload } from './fixtures/createFirstElementRequestPayload';
import { deleteElementRequestPayload } from './fixtures/deleteElementRequestPayload';
import { updateElementRequestPayload } from './fixtures/updateElementRequestPayload';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation server – handling save page request', () => {
  const { request, getWorkingDir } = setupExperimentationServerTest();

  describe('saving the first element', () => {

    let response:Response;

    beforeAll(async () => {
      // when
      response = await performSaveRequestWith(createFirstElementRequestPayload);
    });

    it('responds with OK status code and correct headers', async () => {
      // given
      const expectedHeaders:any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': 'https://app.uxpin.com',
      };

      // then
      expect(response.statusCode).toEqual(OK);
      expect(response.body).toEqual('{}');
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
    });

    it('correctly saves first element', async () => {
      // given
      const expectedPageContent:PageContent = {
        '46a48bee71ce4c20bbc1d1ee97b3891f':
          createFirstElementRequestPayload.changed_elements['46a48bee71ce4c20bbc1d1ee97b3891f'],
        canvas: {
          props: {
            storedElements: [
              '46a48bee71ce4c20bbc1d1ee97b3891f',
            ],
          }, type: 'Canvas', v: '2.0',
        },
      };

      // then
      expect(await getCurrentSavedPage()).toEqual(expectedPageContent);
    });

    describe('and then updating the element', () => {

      beforeAll(async () => {
        // when
        await performSaveRequestWith(updateElementRequestPayload);
      });

      it('correctly updates existing elements', async () => {
        // given
        const expectedPageContent:PageContent = {
          '46a48bee71ce4c20bbc1d1ee97b3891f': {
            props: {
              ...createFirstElementRequestPayload.changed_elements['46a48bee71ce4c20bbc1d1ee97b3891f'].props,
              height: 163,
              width: 347,
            },
            type: 'Box',
            v: '2.0',
          },
          canvas: {
            props: {
              storedElements: [
                '46a48bee71ce4c20bbc1d1ee97b3891f',
              ],
            }, type: 'Canvas', v: '2.0',
          },
        };

        // then
        expect(await getCurrentSavedPage()).toEqual(expectedPageContent);
      });

      describe('and then adding a new element', () => {

        beforeAll(async () => {
          // when
          await performSaveRequestWith(addSecondElementRequestPayload);
        });

        it('correctly saves the new element', async () => {
          // given
          const expectedPageContent:PageContent = {
            '46a48bee71ce4c20bbc1d1ee97b3891f': {
              props: {
                ...createFirstElementRequestPayload.changed_elements['46a48bee71ce4c20bbc1d1ee97b3891f'].props,
                height: 163,
                width: 347,
              },
              type: 'Box',
              v: '2.0',
            },
            b5b8401708bf42df9e2b5ef5cca419bf: {
              props: addSecondElementRequestPayload.changed_elements.b5b8401708bf42df9e2b5ef5cca419bf.props,
              type: 'Circle',
              v: '2.0',
            },
            canvas: {
              props: {
                storedElements: [
                  '46a48bee71ce4c20bbc1d1ee97b3891f',
                  'b5b8401708bf42df9e2b5ef5cca419bf',
                ],
              }, type: 'Canvas', v: '2.0',
            },
          };

          // then
          expect(await getCurrentSavedPage()).toEqual(expectedPageContent);
        });

        describe('and then removing the first element', () => {

          beforeAll(async () => {
            // when
            await performSaveRequestWith(deleteElementRequestPayload);
          });

          it('correctly removes elements', async () => {
            // given
            const expectedPageContent:PageContent = {
              b5b8401708bf42df9e2b5ef5cca419bf: {
                props: addSecondElementRequestPayload.changed_elements.b5b8401708bf42df9e2b5ef5cca419bf.props,
                type: 'Circle',
                v: '2.0',
              },
              canvas: {
                props: {
                  storedElements: [
                    'b5b8401708bf42df9e2b5ef5cca419bf',
                  ],
                }, type: 'Canvas', v: '2.0',
              },
            };

            // then
            expect(await getCurrentSavedPage()).toEqual(expectedPageContent);
          });
        });
      });
    });
  });

  function performSaveRequestWith(payload:PageIncrementalUpdate):RequestPromise {
    const options:RequestPromiseOptions = {
      form: { json: JSON.stringify(payload) },
      method: 'POST',
      resolveWithFullResponse: true,
    };
    return request('/ajax/dmsDPPage/Save/?__ajax_request=1', options);
  }

  function getCurrentSavedPage():Promise<PageContent> {
    return readJson(join(getWorkingDir(), TEMP_DIR_NAME, PAGE_FILE_NAME));
  }
});
