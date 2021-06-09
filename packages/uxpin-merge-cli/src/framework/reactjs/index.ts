import { FrameworkModule } from '../FrameworkModule';
import { getLibraryBundleSource } from './building/library/getLibraryBundleSource';
import { createNewPageContent } from './experimentation/server/createNewPageContent';
import { getComponentMetadata } from './getComponentMetadata';
import { PresetFileGenerator } from './PresetFileGenerator/PresetFileGenerator';
import { decorateWithPresets } from './serialization/presets/decorateWithPresets';
import { isDefaultExportedForwardRef } from './serialization/typescript/component/findExportedFunctionWithReactForwardRef';
import { getComponentDeclaration } from './serialization/typescript/component/getComponentDeclaration';
import { getSerializationContext } from './serialization/typescript/context/getSerializationContext';

export const reactModule:FrameworkModule = {
  PresetFileGenerator,
  createNewPageContent,
  decorateWithPresets,
  getComponentDeclaration,
  getComponentMetadata,
  getLibraryBundleSource,
  getSerializationContext,
  isDefaultExportedForwardRef,
};
