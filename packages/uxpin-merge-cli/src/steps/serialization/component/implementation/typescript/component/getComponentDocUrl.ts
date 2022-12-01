import * as ts from 'typescript';
import { getUXpinDocUrlComment } from '../comments/getUXpinDocUrlComment';

export function getComponentDocUrl(component: ts.Node): string | undefined {
  const componentDocUrl: ts.JSDocTag | undefined = getUXpinDocUrlComment(component);

  return componentDocUrl?.comment;
}
