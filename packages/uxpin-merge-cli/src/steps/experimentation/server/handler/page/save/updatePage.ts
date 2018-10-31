import { isArray, reduce } from 'lodash';
import { PageContent } from '../../../../../../common/types/PageData';
import { DeletedElements, PageIncrementalUpdate } from '../../../../../../common/types/PageIncrementalUpdate';
import { getPageContent } from '../../../common/page/content/getPageContent';
import { writePageContent } from '../../../common/page/content/writePageContent';

export async function updatePage(uxpinDirPath:string, changes:PageIncrementalUpdate):Promise<void> {
  const oldPage:PageContent = await getPageContent(uxpinDirPath);
  const newPage:PageContent = {
    ...removeElements(oldPage, changes.deleted_elements),
    ...updateElements(oldPage, changes.changed_elements),
  };
  await writePageContent(uxpinDirPath, newPage);
}

function updateElements(oldPage:PageContent, changedElements:Partial<PageContent>):PageContent {
  return reduce(changedElements, (newContent, elementChanges, elementId) => {
    const oldElement:{ props:{} } = oldPage[elementId] || { props: {} };
    newContent[elementId] = {
      ...oldElement,
      ...elementChanges,
      props: {
        ...oldElement.props,
        ...elementChanges.props,
      },
    };
    return newContent;
  }, {} as PageContent);
}

function removeElements(pageContent:PageContent, deleted:DeletedElements):PageContent {
  const elementIds:string[] = getElementIds(deleted);
  return reduce(pageContent, (newContent, element, elementId) => {
    if (!elementIds.includes(elementId)) {
      newContent[elementId] = element;
    }
    return newContent;
  }, {} as PageContent);
}

function getElementIds(deleted:DeletedElements):string[] {
  if (isArray(deleted)) {
    return [];
  }
  return Object.keys(deleted).filter((id) => deleted[id]);
}
