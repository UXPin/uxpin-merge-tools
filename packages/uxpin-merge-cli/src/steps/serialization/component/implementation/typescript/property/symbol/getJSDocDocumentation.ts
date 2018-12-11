import * as ts from 'typescript';
import { TSComponentSerializationEnv } from '../../serializeTSComponent';
import { ReactPropertySymbol } from './ReactPropertySymbol';

export function getJSDocDocumentation(context:TSComponentSerializationEnv, propSymbol:ReactPropertySymbol):string {
  return ts.displayPartsToString(propSymbol.getDocumentationComment(context.checker));
}
