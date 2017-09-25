import { ComponentInfo } from './components/ComponentInfo';
import { getDesignSystemComponentInfos } from './components/getDesignSystemComponentInfos';
import { ComponentDefinition } from './serialization/component/ComponentDefinition';
import { DesignSystemDefinition } from './serialization/DesignSystemDefinition';
import { serializeJSComponentProps } from './serialization/props/javascript/serializeJSComponentProps';

export function getDesignSystemMetadata():Promise<DesignSystemDefinition> {
  return getDesignSystemComponentInfos()
    .then((componentInfos) => Promise.all(componentInfos.map(componentInfoToDefinition)))
    .then((components:ComponentDefinition[]) => ({ components, name: '' }));
}

function componentInfoToDefinition(info:ComponentInfo):Promise<ComponentDefinition> {
  return serializeJSComponentProps(info.implementation.path).then(({ properties }) => ({ ...info, properties }));
}
