import { ComponentCategory } from './component/categories/ComponentCategory';

export interface DesignSystemSnapshot {
  name:string;
  categorizedComponents:ComponentCategory[];
  vcs:VCSDetails;
  forcePush?:boolean;
}

export interface VCSDetails {
  branchName:string;
  commitHash:string;
  movedObjects?:MovedObjects;
  // @todo: make `tags` property required after implementation of git tags
  tags?:VCSTag[];
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
