import { ComponentCategory } from './component/categories/ComponentCategory';

export interface DesignSystemSnapshot {
  name:string;
  categorizedComponents:ComponentCategory[];
  vcs:VCSDetails;
}

export interface VCSDetails {
  branchName:string;
  commitHash:string;
  // @todo: make `movedObjects` and `tags` properties required
  movedObjects?:MovedObjects;
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
