import * as ts from 'typescript';

export function getNodeName(node:{ name?:ts.Identifier | ts.PropertyName | ts.BindingName }):ts.__String | undefined {
  if (node.name && ts.isIdentifier(node.name)) {
    return node.name.escapedText;
  }
}
