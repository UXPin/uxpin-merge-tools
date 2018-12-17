import pMap from 'p-map';
import { joinWarningLists } from '../../common/warning/joinWarningLists';
import { Warned } from '../../common/warning/Warned';
import { ProgramArgs } from '../../program/args/ProgramArgs';
import { ComponentCategoryInfo } from '../discovery/component/category/ComponentCategoryInfo';
import { ComponentInfo } from '../discovery/component/ComponentInfo';
import { ComponentCategory } from './component/categories/ComponentCategory';
import { ComponentDefinition } from './component/ComponentDefinition';
import { ExamplesSerializationResult } from './component/examples/ExamplesSerializationResult';
import { serializeExamples } from './component/examples/serializeExamples';
import { getComponentMetadata } from './component/implementation/getComponentMetadata';
import { PresetsSerializationResult } from './component/presets/PresetsSerializationResult';
import { serializePresets } from './component/presets/serializePresets';
import { DesignSystemSnapshot } from './DesignSystemSnapshot';

export async function getDesignSystemMetadata(
  programArgs:ProgramArgs,
  infos:ComponentCategoryInfo[],
):Promise<Warned<DesignSystemSnapshot>> {
  const categories:Array<Warned<ComponentCategory>> = await pMap(infos, thunkCategoryInfoToMetadata(programArgs));
  return {
    result: {
      categorizedComponents: categories.map((category) => category.result),
      name: '',
    },
    warnings: joinWarningLists(categories.map((category) => category.warnings)),
  };
}

function thunkCategoryInfoToMetadata(
  programArgs:ProgramArgs,
):(info:ComponentCategoryInfo) => Promise<Warned<ComponentCategory>> {
  return async ({ componentInfos, name }:ComponentCategoryInfo) => {
    const components:Array<Warned<ComponentDefinition>> = await pMap(componentInfos,
      thunkComponentInfoToDefinition(programArgs));

    return {
      result: {
        components: components.map((component) => component.result),
        name,
      },
      warnings: joinWarningLists(components.map((component) => component.warnings)),
    };
  };
}

function thunkComponentInfoToDefinition(
  programArgs:ProgramArgs,
):(info:ComponentInfo) => Promise<Warned<ComponentDefinition>> {
  return async (info:ComponentInfo) => {
    const { result: metadata, warnings: metadataWarnings } = await getComponentMetadata(info.implementation);
    const { result: examples, warnings: exampleWarnings } = await serializeOptionalExamples(info);
    const { result: presets, warnings: presetWarnings } = await serializeOptionalPresets(programArgs, info);
    return {
      result: { info, ...metadata, documentation: { examples }, presets },
      warnings: joinWarningLists([metadataWarnings, exampleWarnings, presetWarnings]),
    };
  };
}

async function serializeOptionalExamples(info:ComponentInfo):Promise<ExamplesSerializationResult> {
  if (!info.documentation) {
    return { result: [], warnings: [] };
  }

  return await serializeExamples(info.documentation.path);
}

async function serializeOptionalPresets(
  programArgs:ProgramArgs,
  info:ComponentInfo,
):Promise<PresetsSerializationResult> {
  if (!info.presets || !info.presets.length) {
    return { result: [], warnings: [] };
  }

  return await serializePresets(programArgs, info.presets);
}
