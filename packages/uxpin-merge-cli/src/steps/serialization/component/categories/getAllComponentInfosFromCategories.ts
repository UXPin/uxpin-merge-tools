import { flatMap } from 'lodash';
import { ComponentCategoryInfo } from '../../../discovery/component/category/ComponentCategoryInfo';
import { ComponentInfo } from '../../../discovery/component/ComponentInfo';

export function getAllComponentInfosFromCategories(categoryInfos:ComponentCategoryInfo[]):ComponentInfo[] {
  return flatMap(categoryInfos, (category) => category.componentInfos);
}
