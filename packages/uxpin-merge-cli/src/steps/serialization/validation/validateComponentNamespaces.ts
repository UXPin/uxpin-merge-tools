import { ComponentCategory } from '../component/categories/ComponentCategory';
import { getAllComponentsFromCategories } from '../component/categories/getAllComponentsFromCategories';
import { ComponentDefinition } from '../component/ComponentDefinition';
import { getComponentNamespacedName } from '../component/name/getComponentNamespacedName';
import { getComponentNamespaceParents } from '../component/name/getComponentNamespaceParents';

export function validateComponentNamespaces(categories:ComponentCategory[]):void {
  const components:ComponentDefinition[] = getAllComponentsFromCategories(categories);

  const componentsMap:ComponentsMap = components.reduce((map:ComponentsMap, component:ComponentDefinition) => {
    const name:string = getComponentNamespacedName(component);
    const path:string = map[name];

    if (path && path !== component.info.dirPath) {
      throw new Error(`Component "${name}" already exists in ${path}!`);
    }

    map[name] = component.info.dirPath;

    return map;
  }, {});

  components.forEach((component:ComponentDefinition) => {
    const name:string = getComponentNamespacedName(component);
    const parents:string[] = getComponentNamespaceParents(name);

    // If we're in storybook mode, the user will have provided Component.stories.js files instead of Component.js files
    // the parent being invalid is OK in this case because the storybook config merged webpack build will take care of it.
    const isStorybookComponent = name.endsWith('.story') || name.endsWith('.stories');

    const invalidParent:string | undefined = parents.find((parent:string) => !componentsMap[parent]);
    if (!isStorybookComponent && invalidParent) {
      throw new Error(`Namespace "${invalidParent}" does not exist!`);
    }
  });
}

interface ComponentsMap {
  [name:string]:string;
}
