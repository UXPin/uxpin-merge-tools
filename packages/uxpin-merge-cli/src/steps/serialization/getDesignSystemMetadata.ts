import pMap from 'p-map';
import { joinWarningLists } from '../../common/warning/joinWarningLists';
import { Warned } from '../../common/warning/Warned';
import { ProgramArgs } from '../../program/args/ProgramArgs';
import { getBuildOptions } from '../../program/command/push/getBuildOptions';
import { BuildOptions } from '../building/BuildOptions';
import { ComponentCategoryInfo } from '../discovery/component/category/ComponentCategoryInfo';
import { getComponentCategoryInfos } from '../discovery/component/category/getComponentCategoryInfos';
import { ComponentInfo } from '../discovery/component/ComponentInfo';
import { getLibraryName } from '../discovery/library/getLibraryName';
import { ProjectPaths } from '../discovery/paths/ProjectPaths';
import { ComponentCategory } from './component/categories/ComponentCategory';
import { ComponentDefinition } from './component/ComponentDefinition';
import { ExamplesSerializationResult } from './component/examples/ExamplesSerializationResult';
import { serializeExamples } from './component/examples/serializeExamples';
import { getComponentMetadata } from './component/implementation/getComponentMetadata';
import { getBundle } from './component/presets/jsx/bundle/getBundle';
import { PresetsBundle } from './component/presets/jsx/bundle/PresetsBundle';
import { PresetsSerializationResult } from './component/presets/PresetsSerializationResult';
import { serializePresets } from './component/presets/serializePresets';
import { DesignSystemSnapshot, VCSDetails } from './DesignSystemSnapshot';
import { getVscDetails } from './vcs/getVcsDetails';

export async function getDesignSystemMetadata(
  programArgs:ProgramArgs,
  paths:ProjectPaths,
):Promise<Warned<DesignSystemSnapshot>> {
  const buildOptions:BuildOptions = getBuildOptions(programArgs);
  const libraryName:string = getLibraryName(paths);

  const categoryInfos:ComponentCategoryInfo[] = await getComponentCategoryInfos(paths);
  const bundle:PresetsBundle = await getBundle(programArgs, categoryInfos);
  const categories:Array<Warned<ComponentCategory>> = await pMap(categoryInfos, thunkCategoryInfoToMetadata(bundle));

  const categorizedComponents:ComponentCategory[] = categories.map((category) => category.result);
  const vcs:VCSDetails = await getVscDetails(paths, buildOptions, categorizedComponents);

  return {
    result: {
      categorizedComponents,
      name: libraryName,
      vcs,
    },
    warnings: joinWarningLists(categories.map((category) => category.warnings)),
  };
}

function thunkCategoryInfoToMetadata(
  bundle:PresetsBundle,
):(info:ComponentCategoryInfo) => Promise<Warned<ComponentCategory>> {
  return async ({ componentInfos, name }:ComponentCategoryInfo) => {
    const components:Array<Warned<ComponentDefinition>> = await pMap(componentInfos,
      thunkComponentInfoToDefinition(bundle));

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
  bundle:PresetsBundle,
):(info:ComponentInfo) => Promise<Warned<ComponentDefinition>> {
  return async (info:ComponentInfo) => {
    const { result: metadata, warnings: metadataWarnings } = await getComponentMetadata(info.implementation);
    const { result: examples, warnings: exampleWarnings } = await serializeOptionalExamples(info);
    const { result: presets, warnings: presetWarnings } = await serializeOptionalPresets(bundle, info);
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
  bundle:PresetsBundle,
  info:ComponentInfo,
):Promise<PresetsSerializationResult> {
  if (!info.presets || !info.presets.length) {
    return { result: [], warnings: [] };
  }

  return await serializePresets(bundle, info.presets);
}
