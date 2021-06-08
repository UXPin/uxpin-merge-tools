import { FrameworkModule } from '../FrameworkModule';
import { getLibraryBundleSource } from './building/library/getLibraryBundleSource';
import { getComponentMetadata } from './getComponentMetadata';
import { PresetFileGenerator } from './PresetFileGenerator/PresetFileGenerator';
import { isDefaultExportedForwardRef } from './serialization/typescript/component/findExportedFunctionWithReactForwardRef';
import { getComponentDeclaration } from './serialization/typescript/component/getComponentDeclaration';
import { getSerializationContext } from './serialization/typescript/context/getSerializationContext';

export const reactModule:FrameworkModule = {
  PresetFileGenerator,
  getComponentDeclaration,
  getComponentMetadata,
  getLibraryBundleSource,
  getSerializationContext,
  isDefaultExportedForwardRef,
};
