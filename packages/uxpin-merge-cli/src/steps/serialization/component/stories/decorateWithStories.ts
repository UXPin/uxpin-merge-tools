import { flatMap } from 'lodash';
import { Warned } from '../../../../common/warning/Warned';
import { ProgramArgs } from '../../../../program/args/ProgramArgs';
import { ComponentInfo } from '../../../discovery/component/ComponentInfo';
import { ComponentCategory } from '../categories/ComponentCategory';
import { getAllComponentsFromCategories } from '../categories/getAllComponentsFromCategories';
import { ComponentDefinition } from '../ComponentDefinition';
import { PresetsSerializationResult } from '../presets/PresetsSerializationResult';
import { getStoriesBundle } from './bundle/getStoriesBundle';
import { StoriesBundle } from './bundle/StoriesBundle';
import { serializeStories } from './serializeStories';

export async function decorateWithStories(
  categories:Array<Warned<ComponentCategory>>,
  programArgs:ProgramArgs,
):Promise<Array<Warned<ComponentCategory>>> {
  const components:ComponentDefinition[] = getAllComponentsFromCategories(flatMap(categories, (cat) => cat.result));
  const bundle:StoriesBundle = await getStoriesBundle(programArgs, components);

  return categories.map(thunkDecorateComponentsWithStories(bundle));
}

function thunkDecorateComponentsWithStories(
  bundle:StoriesBundle,
):(category:Warned<ComponentCategory>) => Warned<ComponentCategory> {
  return (category) => (
    category.result.components.reduce((decorated, component) => {
      const { result: stories, warnings } = serializeOptionalStories(bundle, component.info);
      const newComponent:ComponentDefinition = {
        ...component,
        presets: [
          ...(component.presets || []),
          ...stories,
        ],
      };
      decorated.result.components.push(newComponent);
      decorated.warnings.push(...warnings);
      return decorated;
    }, {
      result: { ...category.result, components: [] },
      warnings: [...category.warnings],
    } as Warned<ComponentCategory>)
  );
}

function serializeOptionalStories(
  bundle:StoriesBundle,
  info:ComponentInfo,
):PresetsSerializationResult {
  if (!info.stories || !info.stories.length) {
    return { result: [], warnings: [] };
  }

  return serializeStories(bundle, info.stories);
}
