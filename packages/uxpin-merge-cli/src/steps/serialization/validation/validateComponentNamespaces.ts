import { ComponentCategory } from '../component/categories/ComponentCategory';
import { getAllComponentsFromCategories } from '../component/categories/getAllComponentsFromCategories';
import { ComponentDefinition } from '../component/ComponentDefinition';
import { getComponentNamespacedName } from '../component/name/getComponentNamespacedName';
import { getComponentNamespaceParents } from '../component/name/getComponentNamespaceParents';
import { isStorybookComponent } from '../component/storybook/isStorybookComponent';

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

    const invalidParent:string | undefined = parents.find((parent:string) => !componentsMap[parent]);
    // Storybook components are specified via <component>.stories.js files instead of <component>.js.
    // The parent being invalid is allowed as the storybook config merged webpack build
    // will resolve the export.component (which is usually <component>.js) property
    if (invalidParent && !isStorybookComponent(component)) {
      throw new Error(`Namespace "${invalidParent}" does not exist!`);
    }
  });
}

interface ComponentsMap {
  [name:string]:string;
}
