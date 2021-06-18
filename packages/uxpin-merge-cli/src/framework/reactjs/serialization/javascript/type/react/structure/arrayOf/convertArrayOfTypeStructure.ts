import { PropItemType } from 'react-docgen-typescript/lib';
import { TypedArrayStructure } from '../../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { convertPropertyType } from '../../convertPropertyType';

export function convertArrayOfTypeStructure(reactDocgenShape:PropItemType):TypedArrayStructure {
  return { memberType: convertPropertyType(reactDocgenShape) };
}
