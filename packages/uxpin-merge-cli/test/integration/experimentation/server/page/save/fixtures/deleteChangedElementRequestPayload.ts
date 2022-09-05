import { PageIncrementalUpdate } from '../../../../../../../src/common/types/PageIncrementalUpdate';

// tslint:disable-next-line:max-line-length typedef no-var-requires
const introPageContent = require('../../../../../../../src/steps/experimentation/server/common/page/content/introPageContent.json');

export const deleteChangedElementRequestPayload: PageIncrementalUpdate = {
  can_break_cohesion: false,
  changed_elements: {
    '83ty393l': {
      props: {
        x: 100,
        y: 500,
      },
      type: 'Box',
      v: '2.0',
    },
    canvas: {
      props: {
        storedElements: [...introPageContent.canvas.props.storedElements, 'b5b84017'],
      },
      type: 'Canvas',
      v: '2.0',
    },
  },
  comet_thread_id: '8997684629855957696973',
  components_used: {},
  deleted_elements: { '83ty393l': true },
  design_system_used: {},
  id_page: '95454384',
  id_project: '7696973',
  id_save: '83475823475',
};
