import { readJson } from 'fs-extra';
import { OK } from 'http-status-codes';
import { join } from 'path';
import { Response } from 'request';
import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import { PageContent } from '../../../../../../src/common/types/PageData';
import { PageIncrementalUpdate } from '../../../../../../src/common/types/PageIncrementalUpdate';
import { TEMP_DIR_NAME } from '../../../../../../src/steps/building/config/getConfig';
import { PAGE_FILE_NAME } from '../../../../../../src/steps/experimentation/server/handler/page/save/PageSaveHandler';
import { setTimeoutBeforeAll } from '../../../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../../../utils/experimentation/setupExperimentationServerTest';
import { addSecondElementRequestPayload } from './fixtures/addSecondElementRequestPayload';
import { createFirstElementsRequestPayload } from './fixtures/createFirstElementsRequestPayload';
import { deleteChangedElementRequestPayload } from './fixtures/deleteChangedElementRequestPayload';
import { deleteElementRequestPayload } from './fixtures/deleteElementRequestPayload';
import { updateElementRequestPayload } from './fixtures/updateElementRequestPayload';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation server – handling save page request', () => {
  const { request, getWorkingDir } = setupExperimentationServerTest();

  describe('saving the first elements', () => {
    let response:Response;

    beforeAll(async () => {
      // when
      response = await performSaveRequestWith(createFirstElementsRequestPayload);
    });

    it('responds with OK status code and correct headers', async () => {
      // given
      const expectedHeaders:any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': 'https://app.uxpin.com',
      };
      const expectedResponse:Pick<PageIncrementalUpdate, 'id_save'> = {
        id_save: createFirstElementsRequestPayload.id_save,
      };

      // then
      expect(response.statusCode).toEqual(OK);
      expect(response.body).toEqual(expectedResponse);
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
    });

    it('correctly saves first element', async () => {
      // given
      const expectedPageContent:PageContent = {
        '46a48bee': createFirstElementsRequestPayload.changed_elements['46a48bee'],
        '83ty393l': createFirstElementsRequestPayload.changed_elements['83ty393l'],
        canvas: {
          props: {
            storedElements: [
              '46a48bee',
              '83ty393l',
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
          '46a48bee': {
            props: {
              ...createFirstElementsRequestPayload.changed_elements['46a48bee'].props,
              height: 163,
              width: 347,
            },
            type: 'Box',
            v: '2.0',
          },
          '83ty393l': createFirstElementsRequestPayload.changed_elements['83ty393l'],
          canvas: {
            props: {
              storedElements: [
                '46a48bee',
                '83ty393l',
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
            '46a48bee': {
              props: {
                ...createFirstElementsRequestPayload.changed_elements['46a48bee'].props,
                height: 163,
                width: 347,
              },
              type: 'Box',
              v: '2.0',
            },
            '83ty393l': createFirstElementsRequestPayload.changed_elements['83ty393l'],
            b5b84017: addSecondElementRequestPayload.changed_elements.b5b84017,
            canvas: {
              props: {
                storedElements: [
                  '46a48bee',
                  '83ty393l',
                  'b5b84017',
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
              '83ty393l': createFirstElementsRequestPayload.changed_elements['83ty393l'],
              b5b84017: addSecondElementRequestPayload.changed_elements.b5b84017,
              canvas: {
                props: {
                  storedElements: [
                    '83ty393l',
                    'b5b84017',
                  ],
                }, type: 'Canvas', v: '2.0',
              },
            };

            // then
            expect(await getCurrentSavedPage()).toEqual(expectedPageContent);
          });

          describe('and then removing the second element having also changed properties', () => {
            beforeAll(async () => {
              // when
              await performSaveRequestWith(deleteChangedElementRequestPayload);
            });

            it('correctly removes the element', async () => {
              // given
              const expectedPageContent:PageContent = {
                b5b84017: addSecondElementRequestPayload.changed_elements.b5b84017,
                canvas: {
                  props: {
                    storedElements: [
                      'b5b84017',
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
  });

  function performSaveRequestWith(payload:PageIncrementalUpdate):RequestPromise {
    const origin:string = 'https://app.uxpin.com';
    const options:RequestPromiseOptions = {
      form: { json: JSON.stringify(payload) },
      headers: { origin },
      method: 'POST',
      resolveWithFullResponse: true,
    };
    return request('/ajax/dmsDPPage/Save/?__ajax_request=1', options);
  }

  function getCurrentSavedPage():Promise<PageContent> {
    return readJson(join(getWorkingDir(), TEMP_DIR_NAME, PAGE_FILE_NAME));
  }
});
