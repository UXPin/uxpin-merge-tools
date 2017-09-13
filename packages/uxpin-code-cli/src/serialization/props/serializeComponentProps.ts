import { ComponentPropsList } from './ComponentPropsList';
import { getComponentSerializationStrategy } from './getComponentSerializationStrategy';

export function serializeComponentProps(componentFileLocation:string):Promise<ComponentPropsList> {
  return getComponentSerializationStrategy(componentFileLocation)(componentFileLocation);
}
