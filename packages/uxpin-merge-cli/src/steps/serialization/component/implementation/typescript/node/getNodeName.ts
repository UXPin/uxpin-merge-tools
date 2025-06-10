import * as ts from 'typescript';

export function getNodeName(node: any): ts.__String | undefined {
  switch (true) {
    case ts.isExportSpecifier(node):
      if (node.propertyName) {
        return ts.isStringLiteral(node.propertyName)
          ? (node.propertyName.text as ts.__String)
          : node.propertyName.escapedText;
      }

      if (!ts.isStringLiteral(node.name)) {
        return node.name.escapedText;
      }

      return node.name.text as ts.__String;
    case ts.isExportAssignment(node):
      return ((node as ts.ExportAssignment).expression as ts.Identifier).escapedText;
    case ts.isIdentifier(node):
      return node.escapedText;
    case node.name && ts.isIdentifier(node.name):
      return node.name.escapedText;
    case node.name && ts.isLiteralExpression(node.name):
      return node.name.text as ts.__String;
  }
}
