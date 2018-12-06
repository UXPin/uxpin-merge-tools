import pMap from 'p-map';
import { joinWarningLists } from '../../common/warning/joinWarningLists';
import { Warned } from '../../common/warning/Warned';
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

export async function getDesignSystemMetadata(infos:ComponentCategoryInfo[]):Promise<Warned<DesignSystemSnapshot>> {
  const categories:Array<Warned<ComponentCategory>> = await pMap(infos, categoryInfoToCategoryMetadata);
  return {
    result: {
      categorizedComponents: categories.map((category) => category.result),
      name: '',
    },
    warnings: joinWarningLists(categories.map((category) => category.warnings)),
  };
}

async function categoryInfoToCategoryMetadata(info:ComponentCategoryInfo):Promise<Warned<ComponentCategory>> {
  const components:Array<Warned<ComponentDefinition>> = await pMap(info.componentInfos, componentInfoToDefinition);
  return {
    result: {
      components: components.map((component) => component.result),
      name: info.name,
    },
    warnings: joinWarningLists(components.map((component) => component.warnings)),
  };
}

async function componentInfoToDefinition(info:ComponentInfo):Promise<Warned<ComponentDefinition>> {
  const { result: metadata, warnings: metadataWarnings } = await getComponentMetadata(info.implementation);
  const { result: examples, warnings: exampleWarnings } = await serializeOptionalExamples(info);
  const { result: presets, warnings: presetWarnings } = await serializeOptionalPresets(info);
  return {
    result: { info, ...metadata, documentation: { examples }, presets },
    warnings: joinWarningLists([metadataWarnings, exampleWarnings, presetWarnings]),
  };
}

async function serializeOptionalExamples(info:ComponentInfo):Promise<ExamplesSerializationResult> {
  if (!info.documentation) {
    return { result: [], warnings: [] };
  }

  return await serializeExamples(info.documentation.path);
}

async function serializeOptionalPresets(info:ComponentInfo):Promise<PresetsSerializationResult> {
  if (!info.presets || !info.presets.length) {
    return { result: [], warnings: [] };
  }

  return await serializePresets(info.presets);
}
