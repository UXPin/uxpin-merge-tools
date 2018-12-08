import { every } from 'lodash';
import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';

export function serializeEnumDeclaration(declaration:ts.EnumDeclaration):PropertyType {
  if (haveAllEnumMembersInitialized(declaration)) {
    return {
      name: 'union',
      structure: {
        elements: declaration.members.map<PropertyType>((member) => {
          return { name: 'literal', structure: { value: (member.initializer as ts.LiteralExpression)!.text } };
        }),
      },
    };
  }
  return { name: 'unsupported', structure: { raw: declaration.getText() } };
}

function haveAllEnumMembersInitialized(declaration:ts.EnumDeclaration):boolean {
  return every(declaration.members, (m) => !!m.initializer && !!(m.initializer as ts.LiteralExpression).text);
}
