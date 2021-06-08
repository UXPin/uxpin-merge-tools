
export interface FrameworkModule {
  getComponentMetadata:any;
  PresetFileGenerator:any;
  getLibraryBundleSource:any;
  getSerializationContext:any;
  getComponentDeclaration:any;
  isDefaultExportedForwardRef:any; // only for react, for different framework should return false
}
