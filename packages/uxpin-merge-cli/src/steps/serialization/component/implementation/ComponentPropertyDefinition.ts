import * as ts from 'typescript';
import { ParsedPropertyDescriptor } from './ParsedPropertyDescriptor';

export type ComponentPropertyDefinition = ComponentProperty & ComponentPropertyCustomDescriptors;

export interface ComponentProperty {
  defaultValue?: PropertyDefaultValue;
  description: string;
  isRequired: boolean;
  name: string;
  type?: PropertyType;
}

export interface ComponentPropertyCustomDescriptors {
  /**
   * `descriptors` property is disallowed here to make strict distinction between internal `ParsedComponentProperty`
   * and the exported `ComponentPropertyDefinition`. Property defined with `never` causes that's not possible to assign
   * a variable in type of `ParsedComponentProperty` to a variable in type of `ComponentPropertyDefinition`
   * and the other way around.
   */
  descriptors?: never;
  autoUpdate?: PropertyAutoUpdate;
  customDescription?: string;
  customName?: string;
  customType?: CustomControlType;
  hidden?: boolean;
  isAutoUpdated?: true;
}

export type ParsedComponentProperty = ComponentProperty & ParsedPropertyDescriptors;

export interface ParsedPropertyDescriptors {
  descriptors: ParsedPropertyDescriptor[];
}

export enum CustomDescriptorsTags {
  BIND = '@uxpinbind',
  DESCRIPTION = '@uxpindescription',
  HIDDEN = '@uxpinignoreprop',
  NAME = '@uxpinpropname',
  TYPE = '@uxpincontroltype',
}

export interface PropertyDefaultValue {
  value: any;
}

export interface PropertyAutoUpdate {
  targetPropName: string;
  valuePath: string;
}

export interface PropertyType<T extends keyof PropertyTypeStructureMap = keyof PropertyTypeStructureMap> {
  name: T;
  structure: PropertyTypeStructureMap[T];
}

export type PropertyTypeName = keyof PropertyTypeStructureMap;

export interface PropertyTypeStructureMap {
  any: {};
  array: {};
  boolean: {};
  custom: {};
  date: {};
  element: {};
  enum: EnumTypeStructure;
  func: FunctionStructure;
  literal: { value: string | number | ts.PseudoBigInt };
  node: {};
  number: {};
  object: {};
  shape: ShapeTypeStructure;
  string: {};
  symbol: {};
  typedArray: TypedArrayStructure;
  dictionary: { valueType: PropertyType };
  union: UnionTypeStructure;
  unsupported: { raw: string };
  empty: {};
}

export interface EnumTypeStructure {
  label: string | number;
  value: string | number | ts.PseudoBigInt;
}

export interface UnionTypeStructure {
  elements: PropertyType[];
}

export interface ShapeTypeStructure {
  [propName: string]: PropertyType;
}

export interface TypedArrayStructure {
  memberType: PropertyType;
}

export interface FunctionStructure {
  arguments?: FunctionArgumentStructure[];
  returnType?: PropertyType;
}

export interface FunctionArgumentStructure {
  name: string;
  type: PropertyType;
}

export interface CustomControlType<T extends CustomControlTypeName = CustomControlTypeName> {
  name: T;
  structure: CustomControlTypeStructureMap[T];
}

export enum CustomControlTypeName {
  CodeEditor = 'codeeditor',
  Color = 'color',
  Css = 'css',
  Input = 'input',
  Image = 'image',
  Interactions = 'interactions',
  MuiIconsList = 'muiiconslist',
  Number = 'number',
  ReturningFunction = 'returningfunction',
  Select = 'select',
  Switcher = 'switcher',
  Textfield = 'textfield',
}

export interface CustomControlTypeStructureMap {
  [CustomControlTypeName.CodeEditor]: {};
  [CustomControlTypeName.Color]: {};
  [CustomControlTypeName.Css]: {};
  [CustomControlTypeName.Input]: {};
  [CustomControlTypeName.Image]: {};
  [CustomControlTypeName.Interactions]: {};
  [CustomControlTypeName.MuiIconsList]: {};
  [CustomControlTypeName.Number]: {};
  [CustomControlTypeName.ReturningFunction]: { params?: string[] };
  [CustomControlTypeName.Select]: {};
  [CustomControlTypeName.Switcher]: {};
  [CustomControlTypeName.Textfield]: { rows?: number };
}
