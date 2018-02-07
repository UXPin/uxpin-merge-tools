import { ComponentDefinition } from './component/ComponentDefinition';

export interface DesignSystemSnapshot {
  name:string;
  components:ComponentDefinition[];
  vcs?:VCSDetails;
}

export interface VCSDetails {
  commitHash:string;
  branchName:string;
  movedFiles:MovedFiles;
  tags:VCSTag[];
}

export interface MovedFiles {
  diffSourceCommitHash:string;
  components:MovedFilePathsMap;
  presets:MovedFilePathsMap;
}

export interface MovedFilePathsMap {
  [sourcePath:string]:string;
}

export interface VCSTag {
  name:string;
  commitHash:string;
}
