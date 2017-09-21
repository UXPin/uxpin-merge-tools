import { DesignSystemDefinition } from './serialization/DesignSystemDefinition';

export function getDesignSystemMetadata():Promise<DesignSystemDefinition> {
  return Promise.resolve({
    components: [],
    name: '',
  });
}
