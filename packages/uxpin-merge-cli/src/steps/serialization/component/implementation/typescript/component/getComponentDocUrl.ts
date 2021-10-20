import * as ts from 'typescript';
import { getUXpinDocUrlComment } from '../comments/getUXpinDocUrlComment';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function getComponentDocUrl(component:ComponentDeclaration):string | undefined {
  const componentDocUrl:ts.JSDocTag | undefined = getUXpinDocUrlComment(component);

  if (!componentDocUrl?.comment) {
    return;
  }

  return componentDocUrl.comment;
}
