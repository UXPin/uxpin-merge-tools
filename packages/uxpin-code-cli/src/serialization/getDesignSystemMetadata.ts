import { joinWarningLists } from '../common/warning/joinWarningLists';
import { Warned } from '../common/warning/Warned';
import { ComponentInfo } from '../discovery/components/ComponentInfo';
import { getDesignSystemComponentInfos } from '../discovery/components/getDesignSystemComponentInfos';
import { ComponentDefinition } from './component/ComponentDefinition';
import { DesignSystemDefinition } from './DesignSystemDefinition';
import { serializeComponentProps } from './props/serializeComponentProps';

export function getDesignSystemMetadata():Promise<Warned<DesignSystemDefinition>> {
  return getDesignSystemComponentInfos()
    .then((componentInfos) => Promise.all(componentInfos.map(componentInfoToDefinition)))
    .then((components) => {
      return {
        result: {
          components: components.map((component) => component.result),
          name: '',
        },
        warnings: joinWarningLists(components.map((component) => component.warnings)),
      };
    });
}

function componentInfoToDefinition(info:ComponentInfo):Promise<Warned<ComponentDefinition>> {
  return serializeComponentProps(info.implementation.path).then(({ result, warnings }) => ({
    result: { ...info, properties: result },
    warnings,
  }));
}
