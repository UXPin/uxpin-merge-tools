import { ProjectPaths } from '../discovery/paths/ProjectPaths';
import { ComponentCategory } from './component/categories/ComponentCategory';

export interface DesignSystemSnapshot {
  name: string;
  settings?: string;
  categorizedComponents: ComponentCategory[];
  vcs: VCSDetails;
}

export interface VCSDetails {
  branchName: string;
  commitHash: string;
  movedObjects?: MovedObjects;

  // @todo: make `tags` property required after implementation of git tags
  tags?: VCSTag[];

  paths?: ProjectPaths;
}

export interface MovedObjects {
  diffSourceCommitHash: string;
  components: MovedFilePathsMap;
}

export interface MovedFilePathsMap {
  [sourcePath: string]: string;
}

export interface VCSTag {
  name: string;
  commitHash: string;
}
