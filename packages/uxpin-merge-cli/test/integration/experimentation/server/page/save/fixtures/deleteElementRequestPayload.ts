import { PageIncrementalUpdate } from '../../../../../../../src/common/types/PageIncrementalUpdate';

// tslint:disable-next-line:max-line-length typedef no-var-requires
const introPageContent = require('../../../../../../../src/steps/experimentation/server/common/page/content/introPageContent.json');

export const deleteElementRequestPayload: PageIncrementalUpdate = {
  can_break_cohesion: false,
  changed_elements: {
    canvas: {
      props: {
        storedElements: [...introPageContent.canvas.props.storedElements, '83ty393l', 'b5b84017'],
      },
      type: 'Canvas',
      v: '2.0',
    },
  },
  comet_thread_id: '8997684629855957696973',
  components_used: {},
  deleted_elements: { '46a48bee': true },
  design_system_used: {},
  id_page: '95454384',
  id_project: '7696973',
  id_save: '83475823475',
};
