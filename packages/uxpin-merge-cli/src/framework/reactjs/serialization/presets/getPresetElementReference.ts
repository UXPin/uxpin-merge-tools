import { PresetElementReference } from '../../../../common/types/ComponentPreset';
import { isJSXSerializedElement } from './isJSXSerializedElement';
import { AnySerializedElement } from './jsx/JSXSerializationResult';

export function getPresetElementReference(child:AnySerializedElement):PresetElementReference | string {
  if (isJSXSerializedElement(child)) {
    if (typeof child.props.uxpId === 'undefined') {
      throw new Error('Missing `uxpId` property');
    }
    const { props: { uxpId } } = child;
    return { uxpinPresetElementId: uxpId };
  }

  return child;
}
