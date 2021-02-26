import * as ts from 'typescript';

interface Node {
  name?:ts.Identifier | ts.PropertyName | ts.Token<ts.SyntaxKind.StringLiteral>;
}

export function getNodeName(node:Node):ts.__String | undefined {
  if (!node.name) {
    return;
  }

  if (ts.isIdentifier(node.name)) {
    return node.name.escapedText;
  }

  if (ts.isLiteralExpression(node.name)) {
    return node.name.text;
  }
}
