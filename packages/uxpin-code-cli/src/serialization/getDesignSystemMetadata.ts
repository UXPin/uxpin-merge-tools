import { ComponentInfo } from '../discovery/components/ComponentInfo';
import { getDesignSystemComponentInfos } from '../discovery/components/getDesignSystemComponentInfos';
import { ComponentDefinition } from './component/ComponentDefinition';
import { DesignSystemDefinition } from './DesignSystemDefinition';
import { serializeComponentProps } from './props/serializeComponentProps';

export function getDesignSystemMetadata():Promise<DesignSystemDefinition> {
  return getDesignSystemComponentInfos()
    .then((componentInfos) => Promise.all(componentInfos.map(componentInfoToDefinition)))
    .then((components) => ({ components, name: '' }));
}

function componentInfoToDefinition(info:ComponentInfo):Promise<ComponentDefinition> {
  return serializeComponentProps(info.implementation.path).then(({ properties }) => ({ ...info, properties }));
}
