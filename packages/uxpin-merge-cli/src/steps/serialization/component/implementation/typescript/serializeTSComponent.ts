import { every } from 'lodash';
import { parse } from 'path';
import * as ts from 'typescript';
import { Warned } from '../../../../../common/warning/Warned';
import { WarningDetails } from '../../../../../common/warning/WarningDetails';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { ComponentPropertyDefinition, PropertyType } from '../ComponentPropertyDefinition';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { findComponentFile } from './component/findComponentFile';
import { getPropsTypeAndDefaultProps } from './component/getPropsTypeAndDefaultProps';

export interface TSComponentSerializationEnv {
  componentName:string;
  componentPath:string;
  program:ts.Program;
  checker:ts.TypeChecker;
}

export function serializeTSComponent(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  return new Promise((resolve) => {
    const componentName:string = parse(component.path).name;
    const program:ts.Program = ts.createProgram([component.path], {
      module: ts.ModuleKind.ES2015,
      target: ts.ScriptTarget.ES2015,
    });
    const env:TSComponentSerializationEnv = {
      checker: program.getTypeChecker(),
      componentName,
      componentPath: component.path,
      program,
    };

    const serializedProps:Warned<ComponentPropertyDefinition[]> = serializeComponentProperties(env);
    resolve({
      result: {
        name: componentName,
        properties: serializedProps.result,
      },
      warnings: serializedProps.warnings,
    });
  });
}

function serializeComponentProperties(env:TSComponentSerializationEnv):Warned<ComponentPropertyDefinition[]> {
  const { componentPath, componentName } = env;
  const componentFile:ts.SourceFile | undefined = findComponentFile(env, componentPath);
  if (!componentFile) {
    return {
      result: [], warnings: [{
        message: 'TypeScript compiler couldn\'t find component file',
        sourcePath: componentPath,
      }],
    };
  }
  const { propsTypeNode, defaultProps } = getPropsTypeAndDefaultProps(env, componentFile, componentName);
  if (!propsTypeNode) {
    return {
      result: [], warnings: [{
        message: 'Cannot find type of component properties',
        sourcePath: componentPath,
      }],
    };
  }
  const propsTypeSymbol:ts.Symbol = env.checker.getTypeFromTypeNode(propsTypeNode).symbol;
  if (!propsTypeSymbol || propsTypeSymbol.flags !== ts.SymbolFlags.Interface || !propsTypeSymbol.members) {
    return {
      result: [], warnings: [{
        message: 'Unsupported type of properties object – use interface declaration',
        sourcePath: componentPath,
      }],
    };
  }

  const serializedProps:ComponentPropertyDefinition[] = [];
  propsTypeSymbol.members.forEach((typeSymbol, propName) => {
    const propertyDefinition:ComponentPropertyDefinition | undefined =
      convertTypeSymbolToPropertyDefinition(env, typeSymbol, propName);
    if (propertyDefinition) {
      if (propName.toString() in defaultProps) {
        propertyDefinition.defaultValue = { value: defaultProps[propName.toString()] };
      }
      serializedProps.push(propertyDefinition);
    }
  });

  return { result: serializedProps, warnings: [] };
}

export function convertTypeSymbolToPropertyDefinition(
  env:TSComponentSerializationEnv,
  typeSymbol:ts.Symbol,
  propName:ts.__String,
):ComponentPropertyDefinition | undefined {
  if (!ts.isPropertyDeclaration(typeSymbol.valueDeclaration)
    && !ts.isPropertySignature(typeSymbol.valueDeclaration)) {
    return;
  }
  return {
    description: ts.displayPartsToString(typeSymbol.getDocumentationComment(env.checker)),
    isRequired: isPropertyRequired(typeSymbol.valueDeclaration),
    name: propName.toString(),
    type: convertTypeNodeToPropertyType(env, typeSymbol.valueDeclaration.type!),
  };
}

export function convertTypeNodeToPropertyType(env:TSComponentSerializationEnv, typeNode:ts.TypeNode):PropertyType {
  switch (typeNode.kind) {
    case ts.SyntaxKind.StringKeyword:
      return { name: 'string', structure: {} };
    case ts.SyntaxKind.NumberKeyword:
      return { name: 'number', structure: {} };
    case ts.SyntaxKind.BooleanKeyword:
      return { name: 'boolean', structure: {} };
    case ts.SyntaxKind.UnionType:
      return serializeUnionType(env, typeNode as ts.UnionTypeNode);
    case ts.SyntaxKind.LiteralType:
      return serializeLiteralType(typeNode as ts.LiteralTypeNode);
    case ts.SyntaxKind.TypeReference:
      return serializeTypeReference(env, typeNode as ts.TypeReferenceNode);
    default:
      return { name: 'unsupported', structure: { raw: typeNode.getText() } };
  }
}

export function convertDeclarationNodeToPropertyType(declaration:ts.Declaration):PropertyType {
  switch (declaration.kind) {
    case ts.SyntaxKind.EnumDeclaration:
      return serializeEnumType(declaration as ts.EnumDeclaration);
    default:
      return { name: 'unsupported', structure: { raw: declaration.getText() } };
  }
}

export function serializeTypeReference(env:TSComponentSerializationEnv, typeNode:ts.TypeReferenceNode):PropertyType {
  const typeSymbol:ts.Symbol = env.checker.getTypeFromTypeNode(typeNode).symbol;
  switch (typeSymbol.flags) {
    case ts.SymbolFlags.Interface:
      return { name: 'shape', structure: {} };
    default:
      return convertDeclarationNodeToPropertyType(typeSymbol.valueDeclaration);
  }
}

export function serializeEnumType(declaration:ts.EnumDeclaration):PropertyType {
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

export function serializeUnionType(env:TSComponentSerializationEnv, typeNode:ts.UnionTypeNode):PropertyType<'union'> {
  return {
    name: 'union',
    structure: {
      elements: typeNode.types.map((node) => convertTypeNodeToPropertyType(env, node)),
    },
  };
}

export function serializeLiteralType(typeNode:ts.LiteralTypeNode):PropertyType<'literal'> {
  return {
    name: 'literal',
    structure: {
      value: getLiteralTypeNodeValue(typeNode),
    },
  };
}

export function getLiteralTypeNodeValue(typeNode:ts.LiteralTypeNode):any {
  switch (typeNode.literal.kind) {
    case ts.SyntaxKind.TrueKeyword:
      return true;
    case ts.SyntaxKind.FalseKeyword:
      return false;
    case ts.SyntaxKind.StringLiteral:
      return typeNode.literal.text;
  }
}

export function haveAllEnumMembersInitialized(declaration:ts.EnumDeclaration):boolean {
  return every(declaration.members, (m) => !!m.initializer && !!(m.initializer as ts.LiteralExpression).text);
}

type TSProperty = ts.PropertySignature | ts.PropertyDeclaration;

export function isPropertyRequired(declaration:TSProperty):boolean {
  return !declaration.questionToken;
}
