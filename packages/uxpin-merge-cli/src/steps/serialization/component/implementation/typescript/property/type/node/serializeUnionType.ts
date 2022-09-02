import { orderBy } from 'lodash';
import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../context/getSerializationContext';
import { getOrderType } from '../helpers/getOrderType';
import { shouldSortPropertyValues } from '../helpers/shouldSortPropertyValues';
import { convertTypeToPropertyType } from './convertTypeToPropertyType';

export function serializeUnionType(
  context: TSSerializationContext,
  type: ts.UnionType,
  jsDocsTag: ts.JSDocTagInfo[]
): PropertyType<'union'> {
  let elements: any = type.types.map((node) => convertTypeToPropertyType(context, node, jsDocsTag));

  if (shouldSortPropertyValues(jsDocsTag)) {
    elements = orderBy(elements, [(el) => el.structure.value], [getOrderType(jsDocsTag)]);
  }

  return {
    name: 'union',
    structure: { elements },
  };
}
