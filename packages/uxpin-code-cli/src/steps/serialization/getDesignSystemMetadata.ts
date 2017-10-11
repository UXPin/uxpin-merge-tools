import { joinWarningLists } from '../../common/warning/joinWarningLists';
import { Warned } from '../../common/warning/Warned';
import { ComponentInfo } from '../discovery/component/ComponentInfo';
import { ComponentDefinition } from './component/ComponentDefinition';
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
  return getComponentMetadata(info.implementation).then(({ result, warnings }) => ({
    result: { ...info, ...result },
    warnings,
  }));
}
