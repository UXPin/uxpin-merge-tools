import { ComponentDefinition } from '../ComponentDefinition';
import { ComponentCategory } from './ComponentCategory';

export function getAllComponentsFromCategories(categories:ComponentCategory[]):ComponentDefinition[] {
  return categories.reduce((all, category) => {
  	all.push(...category.components);
  	return all;
  }, [] as ComponentDefinition[]);
}
