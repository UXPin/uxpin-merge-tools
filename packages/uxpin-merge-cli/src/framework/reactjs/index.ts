import { FrameworkModule } from '../FrameworkModule';
import { getLibraryBundleSource } from './building/library/getLibraryBundleSource';
import { getComponentMetadata } from './getComponentMetadata';
import { PresetFileGenerator } from './PresetFileGenerator/PresetFileGenerator';

export const reactModule:FrameworkModule = {
  PresetFileGenerator,
  getComponentMetadata,
  getLibraryBundleSource,
};
