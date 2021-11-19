import { flatMap } from 'lodash';
import { Warned } from '../../../../common/warning/Warned';
import { CreateAppProgramArgs, ProgramArgs } from '../../../../program/args/ProgramArgs';
import { ComponentInfo } from '../../../discovery/component/ComponentInfo';
import { ComponentCategory } from '../categories/ComponentCategory';
import { getAllComponentsFromCategories } from '../categories/getAllComponentsFromCategories';
import { ComponentDefinition } from '../ComponentDefinition';
import { getPresetsBundle } from './jsx/bundle/getPresetsBundle';
import { PresetsBundle } from './jsx/bundle/PresetsBundle';
import { PresetsSerializationResult } from './PresetsSerializationResult';
import { serializePresets } from './serializePresets';

export async function decorateWithPresets(
  categories:Array<Warned<ComponentCategory>>,
  programArgs:Exclude<ProgramArgs, CreateAppProgramArgs>,
):Promise<Array<Warned<ComponentCategory>>> {
  const components:ComponentDefinition[] = getAllComponentsFromCategories(flatMap(categories, (cat) => cat.result));
  const bundle:PresetsBundle = await getPresetsBundle(programArgs, components);

  return categories.map(thunkDecorateComponentsWithPresets(bundle));
}

function thunkDecorateComponentsWithPresets(
  bundle:PresetsBundle,
):(category:Warned<ComponentCategory>) => Warned<ComponentCategory> {
  return (category) => (
    category.result.components.reduce((decorated, component) => {
      const { result: presets, warnings } = serializeOptionalPresets(bundle, component.info);
      decorated.result.components.push({ ...component, presets });
      decorated.warnings.push(...warnings);
      return decorated;
    }, {
      result: { ...category.result, components: [] },
      warnings: [...category.warnings],
    } as Warned<ComponentCategory>)
  );
}

function serializeOptionalPresets(
  bundle:PresetsBundle,
  info:ComponentInfo,
):PresetsSerializationResult {
  if (!info.presets || !info.presets.length) {
    return { result: [], warnings: [] };
  }

  return serializePresets(bundle, info.presets);
}
