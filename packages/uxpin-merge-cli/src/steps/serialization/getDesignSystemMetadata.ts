import pMap from 'p-map';
import { joinWarningLists } from '../../common/warning/joinWarningLists';
import { Warned } from '../../common/warning/Warned';
import { ProgramArgs } from '../../program/args/ProgramArgs';
import { getBuildOptions } from '../../program/command/push/getBuildOptions';
import { BuildOptions } from '../building/BuildOptions';
import { ComponentCategoryInfo } from '../discovery/component/category/ComponentCategoryInfo';
import { getComponentCategoryInfos } from '../discovery/component/category/getComponentCategoryInfos';
import { ComponentInfo } from '../discovery/component/ComponentInfo';
import { CliConfig, ComponentSerializer } from '../discovery/config/CliConfig';
import { getConfiguration } from '../discovery/config/getConfiguration';
import { getSerializationPlugin } from '../discovery/config/getSerializationPlugin';
import { getLibraryName } from '../discovery/library/getLibraryName';
import { ProjectPaths } from '../discovery/paths/ProjectPaths';
import { ComponentCategory } from './component/categories/ComponentCategory';
import { ComponentDefinition } from './component/ComponentDefinition';
import { ExamplesSerializationResult } from './component/examples/ExamplesSerializationResult';
import { serializeExamples } from './component/examples/serializeExamples';
import { getComponentMetadata } from './component/implementation/getComponentMetadata';
import { decorateWithPresets } from './component/presets/decorateWithPresets';
import { DesignSystemSnapshot, VCSDetails } from './DesignSystemSnapshot';
import { validateComponentNamespaces } from './validation/validateComponentNamespaces';
import { getVscDetails } from './vcs/getVcsDetails';

export async function getDesignSystemMetadata(
  programArgs:ProgramArgs,
  paths:ProjectPaths,
):Promise<Warned<DesignSystemSnapshot>> {
  const buildOptions:BuildOptions = getBuildOptions(programArgs);
  const libraryName:string = getLibraryName(paths);
  const config:CliConfig = getConfiguration(paths.configPath);
  const serializationPlugin:ComponentSerializer | undefined = getSerializationPlugin(config);

  const categoryInfos:ComponentCategoryInfo[] = await getComponentCategoryInfos(paths);
  const categories:Array<Warned<ComponentCategory>> = await pMap(
    categoryInfos,
    (info) => categoryInfoToMetadata(info, serializationPlugin),
  );
  const categoriesWithPresets:Array<Warned<ComponentCategory>> = await decorateWithPresets(categories, programArgs);

  const categorizedComponents:ComponentCategory[] = categoriesWithPresets.map((category) => category.result);
  const vcs:VCSDetails = await getVscDetails(paths, buildOptions, categorizedComponents);

  validateComponentNamespaces(categorizedComponents);

  return {
    result: {
      categorizedComponents,
      name: libraryName,
      vcs,
    },
    warnings: joinWarningLists(categoriesWithPresets.map((category) => category.warnings)),
  };
}

async function categoryInfoToMetadata(
  { componentInfos, name }:ComponentCategoryInfo,
  serializationPlugin?:ComponentSerializer,
):Promise<Warned<ComponentCategory>> {
  const components:Array<Warned<ComponentDefinition>> = await pMap(
    componentInfos,
    (info) => componentInfoToDefinition(info, serializationPlugin),
  );

  return {
    result: {
      components: components.map((component) => component.result),
      name,
    },
    warnings: joinWarningLists(components.map((component) => component.warnings)),
  };
}

async function componentInfoToDefinition(
  info:ComponentInfo,
  serializationPlugin?:ComponentSerializer,
):Promise<Warned<ComponentDefinition>> {
  const { result: metadata, warnings: metadataWarnings } = await getComponentMetadata(
    info.implementation,
    serializationPlugin,
  );
  const { result: examples, warnings: exampleWarnings } = await serializeOptionalExamples(info);
  return {
    result: { info, ...metadata, documentation: { examples }, presets: [] },
    warnings: joinWarningLists([metadataWarnings, exampleWarnings]),
  };
}

async function serializeOptionalExamples(info:ComponentInfo):Promise<ExamplesSerializationResult> {
  if (!info.documentation) {
    return { result: [], warnings: [] };
  }

  return await serializeExamples(info.documentation.path);
}
