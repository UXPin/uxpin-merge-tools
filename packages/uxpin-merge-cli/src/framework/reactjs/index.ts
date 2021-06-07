import { FrameworkModule } from '../FrameworkModule';
import { getComponentMetadata } from './getComponentMetadata';
import { PresetFileGenerator } from './PresetFileGenerator/PresetFileGenerator';

export const reactModule:FrameworkModule = {
  PresetFileGenerator,
  getComponentMetadata,
};
