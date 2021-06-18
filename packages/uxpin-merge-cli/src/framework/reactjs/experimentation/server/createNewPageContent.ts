import { PageContent } from '../../../../common/types/PageData';
import { PageContentContext } from '../../../../steps/experimentation/server/common/page/content/getPageContent';
import { getComponentId } from '../../../../steps/experimentation/server/common/page/data/codeSync/component/getComponentId';
import { getDesignSystemId } from '../../../../steps/experimentation/server/common/page/data/codeSync/getDesignSystemId';
import { getPresetId } from '../../../../steps/experimentation/server/common/page/data/codeSync/preset/getPresetId';
import { getAllComponentsFromCategories } from '../../../../steps/serialization/component/categories/getAllComponentsFromCategories';
import { ComponentDefinition } from '../../../../steps/serialization/component/ComponentDefinition';
import { DesignSystemSnapshot } from '../../../../steps/serialization/DesignSystemSnapshot';
import { getRandomString } from '../../../../utils/getRandomString';

// tslint:disable-next-line:no-var-requires

const INTRO_COMPONENTS_COUNT:number = 3;
const ELEMENT_ID_LENGTH:number = 32;
const ELEMENT_PLACEMENT_OFFSET:number = 200;
const ELEMENT_PLACEMENT_DISTANCE:number = 500;
const ELEMENT_Y:number = 50;

export function createNewPageContent({ revisionId }:PageContentContext, metadata:DesignSystemSnapshot):PageContent {
  const introPageContent:any = require(
    '../../../../steps/experimentation/server/common/page/content/introPageContent.json',
  );
  const introComponents:ComponentDefinition[] = findIntroComponents(metadata);
  const designSystemId:string = getDesignSystemId(revisionId);

  return introComponents.reduce((result, component, index) => {
    const componentId:string = getComponentId(designSystemId, component.info);
    const elementId:string = getRandomString(ELEMENT_ID_LENGTH);

    return {
      ...result,
      [elementId]: {
        props: {
          codeComponentId: componentId,
          codeComponentPresetId: getComponentPresetId(designSystemId, component),
          framework: 'react',
          revisionId,
          x: index * ELEMENT_PLACEMENT_DISTANCE + ELEMENT_PLACEMENT_OFFSET,
          y: ELEMENT_Y,
        },
        type: 'CodeComponent',
      },
      canvas: {
        ...result.canvas,
        props: {
          ...result.canvas.props,
          storedElements: [
            ...result.canvas.props.storedElements,
            elementId,
          ],
        },
      },
    };
  }, introPageContent);
}

function getComponentPresetId(designSystemId:string, component:ComponentDefinition):string | undefined {
  if (!component.info.presets || !component.info.presets[0]) {
    return undefined;
  }

  return getPresetId(designSystemId, component.info.presets[0].path);
}

function findIntroComponents(metadata:DesignSystemSnapshot):ComponentDefinition[] {
  return getAllComponentsFromCategories(metadata.categorizedComponents).slice(0, INTRO_COMPONENTS_COUNT);
}
