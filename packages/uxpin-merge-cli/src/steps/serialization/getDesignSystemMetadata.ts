import { joinWarningLists } from '../../common/warning/joinWarningLists';
import { Warned } from '../../common/warning/Warned';
import { getRepositoryAdapter } from '../../repositories/getRepositoryAdapter';
import { RepositoryAdapter, CommitMetadata, RepositoryPointer } from '../../repositories/RepositoryAdapter';
import { ComponentCategoryInfo } from '../discovery/component/category/ComponentCategoryInfo';
import { ComponentInfo } from '../discovery/component/ComponentInfo';
import { ProjectPaths } from '../discovery/paths/ProjectPaths';
import { ComponentCategory } from './component/categories/ComponentCategory';
import { ComponentDefinition } from './component/ComponentDefinition';
import { ExamplesSerializationResult } from './component/examples/ExamplesSerializationResult';
import { serializeExamples } from './component/examples/serializeExamples';
import { getComponentMetadata } from './component/implementation/getComponentMetadata';
import { PresetsSerializationResult } from './component/presets/PresetsSerializationResult';
import { serializePresets } from './component/presets/serializePresets';
import { DesignSystemSnapshot } from './DesignSystemSnapshot';

export async function getDesignSystemMetadata(
  categoryInfos:ComponentCategoryInfo[],
  libraryName:string,
  paths:ProjectPaths,
):Promise<Warned<DesignSystemSnapshot>> {
  const repositoryAdapter:RepositoryAdapter = await getRepositoryAdapter(paths.projectRoot);
  const repositoryPointer:RepositoryPointer = await repositoryAdapter.getRepositoryPointer();

  return Promise.all(categoryInfos.map(categoryInfoToCategoryMetadata))
    .then((categories) => ({
      result: {
        categorizedComponents: categories.map((category) => category.result),
        name: libraryName,
        repositoryPointer,
      },
      warnings: joinWarningLists(categories.map((category) => category.warnings)),
    }));
}

function categoryInfoToCategoryMetadata(info:ComponentCategoryInfo):Promise<Warned<ComponentCategory>> {
  return Promise.all(info.componentInfos.map(componentInfoToDefinition))
    .then((components) => ({
      result: {
        components: components.map((component) => component.result),
        name: info.name,
      },
      warnings: joinWarningLists(components.map((component) => component.warnings)),
    }));
}

function componentInfoToDefinition(info:ComponentInfo):Promise<Warned<ComponentDefinition>> {
  return Promise.all([
    getComponentMetadata(info.implementation),
    serializeOptionalExamples(info),
    serializeOptionalPresets(info),
  ]).then(([
      { result: metadata, warnings: metadataWarnings },
      { result: examples, warnings: exampleWarnings },
      { result: presets, warnings: presetWarnings },
    ]) => ({
      result: { info, ...metadata, documentation: { examples }, presets },
      warnings: joinWarningLists([metadataWarnings, exampleWarnings, presetWarnings]),
    }),
  );
}

function serializeOptionalExamples(info:ComponentInfo):Promise<ExamplesSerializationResult> {
  return new Promise((resolve) => {
    if (!info.documentation) {
      return resolve({ result: [], warnings: [] });
    }

    serializeExamples(info.documentation.path).then(resolve);
  });
}

function serializeOptionalPresets(info:ComponentInfo):Promise<PresetsSerializationResult> {
  return new Promise((resolve) => {
    if (!info.presets || !info.presets.length) {
      return resolve({ result: [], warnings: [] });
    }

    serializePresets(info.presets).then(resolve);
  });
}
