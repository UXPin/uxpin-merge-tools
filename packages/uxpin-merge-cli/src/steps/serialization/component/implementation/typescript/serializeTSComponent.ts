import { every } from 'lodash';
import { parse } from 'path';
import * as ts from 'typescript';
import { WarningDetails } from '../../../../../common/warning/WarningDetails';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { ComponentPropertyDefinition, PropertyType } from '../ComponentPropertyDefinition';
import { ImplSerializationResult } from '../ImplSerializationResult';

const REACT_COMPONENT_TYPES:string[] = [
  'React.Component',
  'React.PureComponent',
];

const REACT_DEFAULT_PROPS_PROPERTY_NAME:string = 'defaultProps';

export async function serializeTSComponent(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  const componentName:string = parse(component.path).name;

  const program:ts.Program = ts.createProgram([component.path], {
    module: ts.ModuleKind.ES2015,
    target: ts.ScriptTarget.ES2015,
  });
  const checker:ts.TypeChecker = program.getTypeChecker();
  const componentFile:ts.SourceFile | undefined = findComponentFile(program, component.path);
  if (!componentFile) {
    return getEmptySerializationResult(componentName, {
      message: 'TypeScript compiler couldn\'t find component file',
      sourcePath: component.path,
    });
  }
  const { propsTypeNode, defaultProps } = getPropsTypeAndDefaultProps(componentFile, componentName);
  if (!propsTypeNode) {
    return getEmptySerializationResult(componentName);
  }
  const propsTypeSymbol:ts.Symbol = checker.getTypeFromTypeNode(propsTypeNode).symbol;
  if (!propsTypeSymbol || propsTypeSymbol.flags !== ts.SymbolFlags.Interface || !propsTypeSymbol.members) {
    return getEmptySerializationResult(componentName);
  }

  const serializedProps:ComponentPropertyDefinition[] = [];
  propsTypeSymbol.members.forEach((typeSymbol, propName) => {
    const propertyDefinition:ComponentPropertyDefinition | undefined =
      convertTypeSymbolToPropertyDefinition(typeSymbol, propName);
    if (propertyDefinition) {
      if (propName.toString() in defaultProps) {
        propertyDefinition.defaultValue = { value: defaultProps[propName.toString()] };
      }
      serializedProps.push(propertyDefinition);
    }
  });

  return {
    result: {
      name: componentName,
      properties: serializedProps,
    },
    warnings: [],
  };

  function convertTypeSymbolToPropertyDefinition(
    typeSymbol:ts.Symbol,
    propName:ts.__String,
  ):ComponentPropertyDefinition | undefined {
    if (!ts.isPropertyDeclaration(typeSymbol.valueDeclaration)
      && !ts.isPropertySignature(typeSymbol.valueDeclaration)) {
      return;
    }
    return {
      description: ts.displayPartsToString(typeSymbol.getDocumentationComment(checker)),
      isRequired: isPropertyRequired(typeSymbol.valueDeclaration),
      name: propName.toString(),
      type: convertTypeNodeToPropertyType(typeSymbol.valueDeclaration.type!),
    };
  }

  function convertTypeNodeToPropertyType(typeNode:ts.TypeNode):PropertyType {
    switch (typeNode.kind) {
      case ts.SyntaxKind.StringKeyword:
        return { name: 'string', structure: {} };
      case ts.SyntaxKind.NumberKeyword:
        return { name: 'number', structure: {} };
      case ts.SyntaxKind.BooleanKeyword:
        return { name: 'boolean', structure: {} };
      case ts.SyntaxKind.UnionType:
        return serializeUnionType(typeNode as ts.UnionTypeNode);
      case ts.SyntaxKind.LiteralType:
        return serializeLiteralType(typeNode as ts.LiteralTypeNode);
      case ts.SyntaxKind.TypeReference:
        return serializeTypeReference(typeNode as ts.TypeReferenceNode);
      default:
        return { name: 'unsupported', structure: { raw: typeNode.getText() } };
    }
  }

  function convertDeclarationNodeToPropertyType(declaration:ts.Declaration):PropertyType {
    switch (declaration.kind) {
      case ts.SyntaxKind.EnumDeclaration:
        return serializeEnumType(declaration as ts.EnumDeclaration);
      default:
        return { name: 'unsupported', structure: { raw: declaration.getText() } };
    }
  }

  function serializeTypeReference(typeNode:ts.TypeReferenceNode):PropertyType {
    const typeSymbol:ts.Symbol = checker.getTypeFromTypeNode(typeNode).symbol;
    return convertDeclarationNodeToPropertyType(typeSymbol.valueDeclaration);
  }

  function serializeEnumType(declaration:ts.EnumDeclaration):PropertyType {
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

  function serializeUnionType(typeNode:ts.UnionTypeNode):PropertyType<'union'> {
    return {
      name: 'union',
      structure: {
        elements: typeNode.types.map(convertTypeNodeToPropertyType),
      },
    };
  }

  function serializeLiteralType(typeNode:ts.LiteralTypeNode):PropertyType<'literal'> {
    return {
      name: 'literal',
      structure: {
        value: getLiteralTypeNodeValue(typeNode),
      },
    };
  }

  function getLiteralTypeNodeValue(typeNode:ts.LiteralTypeNode):any {
    switch (typeNode.literal.kind) {
      case ts.SyntaxKind.TrueKeyword:
        return true;
      case ts.SyntaxKind.FalseKeyword:
        return false;
      case ts.SyntaxKind.StringLiteral:
        return typeNode.literal.text;
    }
  }

  function haveAllEnumMembersInitialized(declaration:ts.EnumDeclaration):boolean {
    return every(declaration.members, (m) => !!m.initializer && !!(m.initializer as ts.LiteralExpression).text);
  }

  type TSProperty = ts.PropertySignature | ts.PropertyDeclaration;

  function isPropertyRequired(declaration:TSProperty):boolean {
    return !declaration.questionToken;
  }

  function getEmptySerializationResult(componentName1:string, warning?:WarningDetails):ImplSerializationResult {
    return {
      result: {
        name: componentName1,
        properties: [],
      },
      warnings: warning ? [warning] : [],
    };
  }

  interface DefaultProps {
    [propName:string]:any;
  }

  interface ComponentDeclarationData {
    propsTypeNode:ts.TypeNode | undefined;
    defaultProps:DefaultProps;
  }

  function getPropsTypeAndDefaultProps(
    sourceFile:ts.SourceFile,
    componentFileName:string,
  ):ComponentDeclarationData {
    const componentFunc:ts.FunctionDeclaration | undefined = findDefaultExportedFunction(sourceFile) ||
      findExportedFunctionWithName(sourceFile, componentFileName);
    if (componentFunc) {
      return {
        defaultProps: {},
        propsTypeNode: getPropsTypeOfFunctionalComponent(componentFunc),
      };
    }
    const componentClass:ClassComponentDeclaration | undefined = findDefaultExportedClass(sourceFile) ||
      findExportedClassWithName(sourceFile, componentFileName);
    if (componentClass) {
      return {
        defaultProps: getDefaultPropsOfClassComponent(componentClass),
        propsTypeNode: getPropsTypeOfClassComponent(componentClass),
      };
    }
    return { defaultProps: {}, propsTypeNode: undefined };
  }

  function getDefaultPropsOfClassComponent(componentClass:ClassComponentDeclaration):DefaultProps {
    const defaultsProp:ts.PropertyDeclaration | undefined =
      componentClass.members.find(isDefaultPropertiesStaticProperty);
    if (defaultsProp && defaultsProp.initializer && ts.isObjectLiteralExpression(defaultsProp.initializer)) {
      return defaultsProp.initializer.properties.reduce<DefaultProps>((defaults, property) => {
        if (ts.isPropertyAssignment(property)) {
          const defaultValue:SupportedDefaultValue | undefined = getDefaultPropertyValue(property.initializer);
          if (typeof defaultValue !== 'undefined') {
            defaults[getNodeName(property)!.toString()] = defaultValue;
          }
        }
        return defaults;
      }, {});
    }
    return {};
  }

  type SupportedDefaultValue = number | string | boolean;

  function getDefaultPropertyValue(valueInitializer:ts.Expression):SupportedDefaultValue | undefined {
    switch (valueInitializer.kind) {
      case ts.SyntaxKind.StringLiteral:
        return (valueInitializer as ts.StringLiteral).text;
      case ts.SyntaxKind.NumericLiteral:
        return parseInt((valueInitializer as ts.NumericLiteral).text, 10);
      case ts.SyntaxKind.TrueKeyword:
        return true;
      case ts.SyntaxKind.FalseKeyword:
        return false;
      case ts.SyntaxKind.Identifier:
        return getDefaultValueFromIdentifier(valueInitializer as ts.Identifier);
      default:
        return;
    }
  }

  function getDefaultValueFromIdentifier(propertyInitializer:ts.Identifier):SupportedDefaultValue | undefined {
    const symbol:ts.Symbol | undefined = checker.getSymbolAtLocation(propertyInitializer);
    if (symbol && ts.isVariableDeclaration(symbol.valueDeclaration) && symbol.valueDeclaration.initializer) {
      return getDefaultPropertyValue(symbol.valueDeclaration.initializer);
    }
  }

  function isDefaultPropertiesStaticProperty(member:ts.ClassElement):member is ts.PropertyDeclaration {
    return ts.isPropertyDeclaration(member)
      && isStaticProperty(member)
      && !isPrivateProperty(member)
      && getNodeName(member) === REACT_DEFAULT_PROPS_PROPERTY_NAME;
  }

  function findComponentFile(program1:ts.Program, path:string):ts.SourceFile | undefined {
    for (const sourceFile of program1.getSourceFiles()) {
      if (sourceFile.fileName === path) {
        return sourceFile;
      }
    }
  }

  function getPropsTypeOfClassComponent(componentClass:ClassComponentDeclaration):ts.TypeNode | undefined {
    if (!componentClass.heritageClauses) {
      return;
    }
    return getPropsTypeNodeFromHeritageClauses(componentClass.heritageClauses);
  }

  function getPropsTypeNodeFromHeritageClauses(
    heritageClauses:ts.NodeArray<ts.HeritageClause>,
  ):ts.TypeNode | undefined {
    for (const clause of heritageClauses) {
      if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
        for (const type of clause.types) {
          if (ts.isExpressionWithTypeArguments(type)
            && REACT_COMPONENT_TYPES.includes(type.expression.getText())
            && type.typeArguments) {
            return type.typeArguments[0];
          }
        }
      }
    }
    return;
  }

  function getPropsTypeOfFunctionalComponent(func:ts.FunctionDeclaration):ts.TypeNode | undefined {
    if (!func.parameters || !func.parameters[0] || !func.parameters[0].type) {
      return;
    }
    return func.parameters[0].type;
  }

  function findDefaultExportedFunction(sourceFile:ts.SourceFile):ts.FunctionDeclaration | undefined {
    let result:ts.FunctionDeclaration | undefined;
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isFunctionDeclaration(node) && isDefaultExported(node)) {
        result = node;
      }
    });
    return result;
  }

  function findExportedFunctionWithName(
    sourceFile:ts.SourceFile,
    functionName:string,
  ):ts.FunctionDeclaration | undefined {
    let result:ts.FunctionDeclaration | undefined;
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isFunctionDeclaration(node) && isExported(node) && getNodeName(node) === functionName) {
        result = node;
      }
    });
    return result;
  }

  type ComponentDeclaration = ts.FunctionDeclaration | ClassComponentDeclaration;

  type ClassComponentDeclaration = ts.ClassDeclaration | ts.ClassExpression;

  function findDefaultExportedClass(sourceFile:ts.SourceFile):ClassComponentDeclaration | undefined {
    let result:ts.ClassDeclaration | ts.ClassExpression | undefined;
    ts.forEachChild(sourceFile, (node) => {
      if ((ts.isClassDeclaration(node) || ts.isClassExpression(node)) && isDefaultExported(node)) {
        result = node;
      }
    });
    return result;
  }

  function isStaticProperty(declaration:ts.PropertyDeclaration):boolean {
    if (!declaration.modifiers) {
      return false;
    }
    return !!declaration.modifiers.find((m) => m.kind === ts.SyntaxKind.StaticKeyword);
  }

  function isPrivateProperty(declaration:ts.PropertyDeclaration):boolean {
    if (!declaration.modifiers) {
      return false;
    }
    return !!declaration.modifiers.find((m) => m.kind === ts.SyntaxKind.PrivateKeyword);
  }

  function findExportedClassWithName(sourceFile:ts.SourceFile, className:string):ClassComponentDeclaration | undefined {
    let result:ts.ClassDeclaration | ts.ClassExpression | undefined;
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isClassDeclaration(node) && isExported(node) && getNodeName(node) === className) {
        result = node;
      }
    });
    return result;
  }

  function isDefaultExported(node:ComponentDeclaration):boolean {
    if (!node.modifiers) {
      return false;
    }
    const isDefault:boolean = !!node.modifiers.find((m) => m.kind === ts.SyntaxKind.DefaultKeyword);
    return isExported(node) && isDefault;
  }

  function isExported(node:ComponentDeclaration):boolean {
    if (!node.modifiers) {
      return false;
    }
    return !!node.modifiers.find((m) => m.kind === ts.SyntaxKind.ExportKeyword);
  }

  function getNodeName(node:{ name?:ts.Identifier | ts.PropertyName }):ts.__String | undefined {
    if (node.name && ts.isIdentifier(node.name)) {
      return node.name.escapedText;
    }
  }
}
