// tslint:disable-next-line:max-line-length typedef no-var-requires
import { PageContent } from '../../../../../../../src/common/types/PageData';

// tslint:disable-next-line:typedef max-line-length no-var-requires
const introPageContent = require('../../../../../../../src/steps/experimentation/server/common/page/content/introPageContent.json');

export function getExpectedIntroPageWithExampleElementsGuessingUniqueIdsFrom(responsePage:PageContent):PageContent {
  const firstDroppedExample:any = {
    props: {
      codeComponentId: 'f2dff102-3d25-5174-b733-12c4e58fdd5d',
      codeComponentPresetId: '02943eee-ab9a-57c6-adf8-d5c4978cd0b1',
      framework: 'react',
      revisionId: '3ab57996-fdf2-41cd-b3c6-85ba98596081_33a58bbfb9e97c671048f796c842723f13599762',
      x: 200,
      y: 50,
    },
    type: 'CodeComponent',
  };
  const secondDroppedExample:any = {
    props: {
      codeComponentId: 'ba14886c-2674-52a3-a147-7b88e725e4ee',
      codeComponentPresetId: '364b2288-4144-5962-8ad2-7c5ebc0ab2ae',
      framework: 'react',
      revisionId: '3ab57996-fdf2-41cd-b3c6-85ba98596081_33a58bbfb9e97c671048f796c842723f13599762',
      x: 700,
      y: 50,
    },
    type: 'CodeComponent',
  };

  const knownIds:string[] = Object.keys(introPageContent);
  const unknownIds:string[] = Object.keys(responsePage).filter((key) => !knownIds.includes(key));

  let firstNewId:string;
  let secondNewId:string;
  if (responsePage[unknownIds[0]].props.codeComponentId === 'f2dff102-3d25-5174-b733-12c4e58fdd5d') {
    [firstNewId, secondNewId] = unknownIds;
  } else {
    [firstNewId, secondNewId] = unknownIds.reverse();
  }

  return {
    ...introPageContent,
    [firstNewId]: firstDroppedExample,
    [secondNewId]: secondDroppedExample,
    canvas: {
      props: {
        storedElements: [
          ...introPageContent.canvas.props.storedElements,
          firstNewId,
          secondNewId,
        ],
      },
      type: 'Canvas',
      v: '2.1',
    },
  };
}
