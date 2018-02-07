import { joinWarningLists } from '../../common/warning/joinWarningLists';
import { Warned } from '../../common/warning/Warned';
import { ComponentInfo } from '../discovery/component/ComponentInfo';
import { ComponentDefinition } from './component/ComponentDefinition';
import { ExamplesSerializationResult } from './component/examples/ExamplesSerializationResult';
import { serializeExamples } from './component/examples/serializeExamples';
import { getComponentMetadata } from './component/implementation/getComponentMetadata';
import { DesignSystemSnapshot } from './DesignSystemSnapshot';

export function getDesignSystemMetadata(componentInfos:ComponentInfo[]):Promise<Warned<DesignSystemSnapshot>> {
  return Promise.all(componentInfos.map(componentInfoToDefinition))
    .then((components) => ({
      result: {
        components: components.map((component) => component.result),
        name: '',
      },
      warnings: joinWarningLists(components.map((component) => component.warnings)),
    }));
}

function componentInfoToDefinition(info:ComponentInfo):Promise<Warned<ComponentDefinition>> {
  return Promise.all([
    getComponentMetadata(info.implementation),
    serializeOptionalExamples(info),
  ]).then(([{ result: metadata, warnings: metadataWarnings }, { result: examples, warnings: exampleWarnings }]) => ({
    result: { ...info, ...metadata, examples },
    warnings: joinWarningLists([metadataWarnings, exampleWarnings]),
  }));
}

function serializeOptionalExamples(info:ComponentInfo):Promise<ExamplesSerializationResult> {
  return new Promise((resolve) => {
    if (!info.documentation) {
      return resolve({ result: [], warnings: [] });
    }

    serializeExamples(info.documentation.path).then(resolve);
  });
}
