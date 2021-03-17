import * as ts from 'typescript';

export function getNodeName(node:any):ts.__String | undefined {
  switch (true) {
    case ts.isExportSpecifier(node):
      return (node.propertyName && node.propertyName.escapedText) || node.name.escapedText;
    case ts.isExportAssignment(node):
      return ((node as ts.ExportAssignment).expression as ts.Identifier).escapedText;
    case ts.isIdentifier(node):
      return node.escapedText;
    case !node.name:
      return;
    case ts.isIdentifier(node.name):
      return node.name.escapedText;
    case ts.isLiteralExpression(node.name):
      return node.name.text as ts.__String;
  }
}
