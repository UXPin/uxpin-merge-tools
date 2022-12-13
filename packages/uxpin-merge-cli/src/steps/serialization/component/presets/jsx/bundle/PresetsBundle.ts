import { JSXSerializedElement } from '../JSXSerializationResult';

export interface PresetsBundle {
  [importName: string]: JSXSerializedElement;
}
