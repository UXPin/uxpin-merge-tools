import { PageContent } from '../../../../../../common/types/PageData';

export function getNewPageContent():PageContent {
  return {
    canvas: {
      props: { storedElements: [] },
      type: 'Canvas',
      v: '2.0',
    },
  };
}
