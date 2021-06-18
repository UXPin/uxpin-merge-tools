import * as ts from 'typescript';
import { FileGeneratorConstructor } from '../common/types/FileGenerator';
import { PageContent } from '../common/types/PageData';
import { Warned } from '../common/warning/Warned';
import { ProgramArgs } from '../program/args/ProgramArgs';
import { ComponentImplementationInfo } from '../steps/discovery/component/ComponentInfo';
import { PageContentContext } from '../steps/experimentation/server/common/page/content/getPageContent';
import { ComponentCategory } from '../steps/serialization/component/categories/ComponentCategory';
import { ComponentDefinition } from '../steps/serialization/component/ComponentDefinition';
import { PropertyType } from '../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { ImplSerializationResult } from '../steps/serialization/component/implementation/ImplSerializationResult';
import { ComponentDeclaration } from '../steps/serialization/component/implementation/typescript/component/getPropsTypeAndDefaultProps';
import { TSSerializationContext } from '../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { DesignSystemSnapshot } from '../steps/serialization/DesignSystemSnapshot';

export interface FrameworkModule {
  // only for react, for different framework should return false
  KNOWN_PROPERTY_TYPES_MAP:{ [typeName:string]:PropertyType };
  PresetFileGenerator:FileGeneratorConstructor;
  createNewPageContent:({ revisionId }:PageContentContext, metadata:DesignSystemSnapshot) => PageContent;
  decorateWithPresets:(
    categories:Array<Warned<ComponentCategory>>,
    programArgs:ProgramArgs,
  ) => Promise<Array<Warned<ComponentCategory>>> ;
  getComponentDeclaration:(context:TSSerializationContext) => ComponentDeclaration | undefined;
  getComponentMetadata:(component:ComponentImplementationInfo) => Promise<ImplSerializationResult>;
  getLibraryBundleSource:(components:ComponentDefinition[], wrapperPath?:string) => string;
  getSerializationContext:(component:ComponentImplementationInfo) => TSSerializationContext ;
  isDefaultExportedForwardRef:(node:ts.Node) => node is ts.ExportAssignment;
}
