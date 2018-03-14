import { ComponentCategory } from './component/categories/ComponentCategory';

export interface DesignSystemSnapshot {
  name:string;
  categorizedComponents:ComponentCategory[];
  // @todo: make `vcs` property required after implementation of files tracking
  vcs?:VCSDetails;
}

export interface VCSDetails {
  commitHash:string;
  branchName:string;
  movedObjects:MovedObjects;
  tags:VCSTag[];
}

export interface MovedObjects {
  diffSourceCommitHash:string;
  components:MovedFilePathsMap;
}

export interface MovedFilePathsMap {
  [sourcePath:string]:string;
}

export interface VCSTag {
  name:string;
  commitHash:string;
}
