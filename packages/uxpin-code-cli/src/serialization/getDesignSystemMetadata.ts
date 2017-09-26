import { ComponentInfo } from '../discovery/components/ComponentInfo';
import { getDesignSystemComponentInfos } from '../discovery/components/getDesignSystemComponentInfos';
import { ComponentDefinition } from './component/ComponentDefinition';
import { DesignSystemDefinition } from './DesignSystemDefinition';
import { serializeJSComponentProps } from './props/javascript/serializeJSComponentProps';

export function getDesignSystemMetadata():Promise<DesignSystemDefinition> {
  return getDesignSystemComponentInfos()
    .then((componentInfos) => Promise.all(componentInfos.map(componentInfoToDefinition)))
    .then((components:ComponentDefinition[]) => ({ components, name: '' }));
}

function componentInfoToDefinition(info:ComponentInfo):Promise<ComponentDefinition> {
  return serializeJSComponentProps(info.implementation.path).then(({ properties }) => ({ ...info, properties }));
}
