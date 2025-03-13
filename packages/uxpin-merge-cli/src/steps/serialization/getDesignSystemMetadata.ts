import debug from 'debug';
import { flatten } from 'lodash';
import pMap from 'p-map';

import { joinWarningLists } from '../../common/warning/joinWarningLists';
import { Warned } from '../../common/warning/Warned';
import { CreateAppProgramArgs, ProgramArgs } from '../../program/args/ProgramArgs';
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
import { decorateWithPresets } from './component/presets/decorateWithPresets';
import { DesignSystemSnapshot, VCSDetails } from './DesignSystemSnapshot';
import { validateComponentNamespaces } from './validation/validateComponentNamespaces';
import { getVcsDetails } from './vcs/getVcsDetails';
import { MergeComponentSerializer } from './serializer';
import { getLibrarySettings } from '../discovery/library/getLibrarySettings';

const log = debug('uxpin');

export async function getDesignSystemMetadata(
  programArgs: Exclude<ProgramArgs, CreateAppProgramArgs>,
  paths: ProjectPaths
): Promise<Warned<DesignSystemSnapshot>> {
  const buildOptions: BuildOptions = getBuildOptions(programArgs);
  const libraryName: string = getLibraryName(paths);
  const librarySettings = getLibrarySettings(paths);

  const categoryInfos: ComponentCategoryInfo[] = await getComponentCategoryInfos(paths);

  const components = flatten(
    categoryInfos.map((category) => category.componentInfos.map((component) => component.implementation))
  );
  const serializer = new MergeComponentSerializer(components);
  await serializer.init();

  const categories: Array<Warned<ComponentCategory>> = await pMap(
    categoryInfos,
    (category) => categoryInfoToMetadata(category, serializer),
    { concurrency: 1 }
  );
  const categoriesWithPresets: Array<Warned<ComponentCategory>> = await decorateWithPresets(categories, programArgs);

  const categorizedComponents: ComponentCategory[] = categoriesWithPresets.map((category) => category.result);
  const vcs: VCSDetails = await getVcsDetails(paths, buildOptions, categorizedComponents);

  validateComponentNamespaces(categorizedComponents);

  if (librarySettings) {
    return {
      result: {
        categorizedComponents,
        name: libraryName,
        settings: librarySettings,
        vcs,
      },
      warnings: joinWarningLists(categoriesWithPresets.map((category) => category.warnings)),
    };
  }

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
  { componentInfos, name }: ComponentCategoryInfo,
  serializer: MergeComponentSerializer
): Promise<Warned<ComponentCategory>> {
  log(`Get metadata from "${name}" category components`);
  const components: Array<Warned<ComponentDefinition>> = await pMap(
    componentInfos,
    (info: ComponentInfo) => componentInfoToDefinition(info, serializer),
    { concurrency: 1 }
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
  info: ComponentInfo,
  serializer: MergeComponentSerializer
): Promise<Warned<ComponentDefinition>> {
  const { result: metadata, warnings: metadataWarnings } = await serializer.serialize(info.implementation);
  const { result: examples, warnings: exampleWarnings } = await serializeOptionalExamples(info);
  return {
    result: { info, ...metadata, documentation: { examples }, presets: [] },
    warnings: joinWarningLists([metadataWarnings, exampleWarnings]),
  };
}

async function serializeOptionalExamples(info: ComponentInfo): Promise<ExamplesSerializationResult> {
  if (!info.documentation) {
    return { result: [], warnings: [] };
  }

  return await serializeExamples(info.documentation.path);
}
