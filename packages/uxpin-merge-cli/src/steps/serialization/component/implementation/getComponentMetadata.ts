import { ComponentImplementationInfo } from '../../../discovery/component/ComponentInfo';
import { MergeComponentSerializer } from '../../serializer';
import { ImplSerializationResult } from './ImplSerializationResult';

// TODO: we don't need this function, we should use the serializer directly
export function getComponentMetadata(
  component: ComponentImplementationInfo,
  serializer: MergeComponentSerializer
): Promise<ImplSerializationResult> {
  return serializer.serialize(component);
}
