import { joinWarningLists } from '../../common/warning/joinWarningLists';
import { Warned } from '../../common/warning/Warned';
import { ComponentInfo } from '../discovery/component/ComponentInfo';
import { ComponentDefinition } from './component/ComponentDefinition';
import { ComponentExample } from './component/examples/ComponentExample';
import { serializeExamples } from './component/examples/serializeExamples';
import { getComponentMetadata } from './component/implementation/getComponentMetadata';
import { DesignSystemDefinition } from './DesignSystemDefinition';

export function getDesignSystemMetadata(componentInfos:ComponentInfo[]):Promise<Warned<DesignSystemDefinition>> {
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
  ]).then(([{ result, warnings }, examples]) => ({
    result: { ...info, ...result, examples },
    warnings,
  }));
}

function serializeOptionalExamples(info:ComponentInfo):Promise<ComponentExample[]> {
  return new Promise((resolve) => {
    if (!info.documentation) {
      return resolve([]);
    }

    serializeExamples(info.documentation.path).then(resolve);
  });
}
