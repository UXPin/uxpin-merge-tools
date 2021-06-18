
export interface FileGeneratorConstructor {
  new (componentPath:string):FileGenerator;
}

export declare class FileGenerator {
  public init():Promise<void>;
  public createPresetFile():Promise<void>;
  public generateComponentFile():Promise<string>;
}
