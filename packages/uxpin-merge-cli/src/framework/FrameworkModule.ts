
export interface FrameworkModule {
  KNOWN_PROPERTY_TYPES_MAP:any;
  getComponentMetadata:any;
  PresetFileGenerator:any;
  getLibraryBundleSource:any;
  getSerializationContext:any;
  getComponentDeclaration:any;
  decorateWithPresets:any;
  isDefaultExportedForwardRef:any; // only for react, for different framework should return false
  createNewPageContent:any;
}
