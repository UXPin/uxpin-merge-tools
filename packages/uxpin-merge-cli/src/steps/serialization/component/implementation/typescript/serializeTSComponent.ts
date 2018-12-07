import { parse } from 'path';
import * as ts from 'typescript';
import { WarningDetails } from '../../../../../common/warning/WarningDetails';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { ComponentPropertyDefinition, PropertyType } from '../ComponentPropertyDefinition';
import { ImplSerializationResult } from '../ImplSerializationResult';

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
  const propsTypeNode:ts.TypeNode | undefined = getPropsType(componentFile, componentName);
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
}

function convertTypeSymbolToPropertyDefinition(
  typeSymbol:ts.Symbol,
  propName:ts.__String,
):ComponentPropertyDefinition | undefined {
  if (!ts.isPropertyDeclaration(typeSymbol.valueDeclaration) && !ts.isPropertySignature(typeSymbol.valueDeclaration)) {
    return;
  }
  const definition:ComponentPropertyDefinition = {
    description: '',
    isRequired: isPropertyRequired(typeSymbol.valueDeclaration),
    name: propName.toString(),
  };
  if (typeSymbol.valueDeclaration.type) {
    definition.type = convertTypeNodeToPropertyType(typeSymbol.valueDeclaration.type);
  }
  return definition;
}

function isPropertyRequired(declaration:ts.PropertySignature | ts.PropertyDeclaration):boolean {
  return !declaration.questionToken;
}

function convertTypeNodeToPropertyType(typeNode:ts.TypeNode):PropertyType {
  switch (typeNode.kind) {
    case ts.SyntaxKind.StringKeyword:
      return { name: 'string', structure: {} };
    case ts.SyntaxKind.NumberKeyword:
      return { name: 'number', structure: {} };
    case ts.SyntaxKind.BooleanKeyword:
      return { name: 'boolean', structure: {} };
    default:
      return { name: 'unsupported', structure: { raw: typeNode.getText() } };
  }
}

function getEmptySerializationResult(componentName:string, warning?:WarningDetails):ImplSerializationResult {
  return {
    result: {
      name: componentName,
      properties: [],
    },
    warnings: warning ? [warning] : [],
  };
}

function getPropsType(
  sourceFile:ts.SourceFile,
  componentName:string,
):ts.TypeNode | undefined {
  const func:ts.FunctionDeclaration | undefined = findDefaultExportedFunction(sourceFile) ||
    findExportedFunctionWithName(sourceFile, componentName);
  if (func) {
    return getPropsTypeOfFunctionalComponent(func);
  }
}

function findComponentFile(program:ts.Program, path:string):ts.SourceFile | undefined {
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.fileName === path) {
      return sourceFile;
    }
  }
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
    if (ts.isFunctionDeclaration(node) && isExported(node) && getFunctionName(node) === functionName) {
      result = node;
    }
  });
  return result;
}

function isDefaultExported(node:ts.FunctionDeclaration):boolean {
  if (!node.modifiers) {
    return false;
  }
  const isDefault:boolean = !!node.modifiers.find((m) => m.kind === ts.SyntaxKind.DefaultKeyword);
  return isExported(node) && isDefault;
}

function isExported(node:ts.FunctionDeclaration):boolean {
  if (!node.modifiers) {
    return false;
  }
  return !!node.modifiers.find((m) => m.kind === ts.SyntaxKind.ExportKeyword);
}

function getFunctionName(node:ts.FunctionDeclaration):ts.__String | undefined {
  if (!node.name) {
    return;
  }
  return node.name.escapedText;
}
