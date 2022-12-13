import { ReactPropertySymbol } from './ReactPropertySymbol';

export function isPropertyRequired(symbol: ReactPropertySymbol): boolean {
  return !symbol.valueDeclaration.questionToken;
}
