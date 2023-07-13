import { Syntax as ASTNodeTypes } from 'markdown-to-ast';

type TokenType = keyof ASTNodeTypes;

interface Token {
  type: TokenType;
  children: Token[];
  lang?: string;
  value?: string;
}

export const Syntax: typeof ASTNodeTypes = ASTNodeTypes;

export declare function parse(text: string): Token;
