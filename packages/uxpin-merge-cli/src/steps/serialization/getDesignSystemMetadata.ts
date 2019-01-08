import { joinWarningLists } from '../../common/warning/joinWarningLists';
import { Warned } from '../../common/warning/Warned';
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
import { PresetsSerializationResult } from './component/presets/PresetsSerializationResult';
import { serializePresets } from './component/presets/serializePresets';
import { DesignSystemSnapshot, VCSDetails } from './DesignSystemSnapshot';
import { getVscDetails } from './vcs/getVcsDetails';

export async function getDesignSystemMetadata(
  paths:ProjectPaths,
  buildOptions:BuildOptions,
):Promise<Warned<DesignSystemSnapshot>> {
  const categoryInfos:ComponentCategoryInfo[] = await getComponentCategoryInfos(paths);
  const libraryName:string = getLibraryName(paths);

  return Promise.all(categoryInfos.map(categoryInfoToCategoryMetadata))
    .then(async (categories) => {
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
    });
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
