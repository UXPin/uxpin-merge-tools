import * as ts from 'typescript';
import { TSSerializationContext } from '../../../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { ReactPropertySymbol } from './ReactPropertySymbol';

export function getJSDocDocumentation(context:TSSerializationContext, propSymbol:ReactPropertySymbol):string {
  return ts.displayPartsToString(propSymbol.getDocumentationComment(context.checker));
}
