import { ComponentCategory } from './component/categories/ComponentCategory';
import { RepositoryPointer } from '../../repositories/RepositoryAdapter';

export interface DesignSystemSnapshot {
  name:string;
  categorizedComponents:ComponentCategory[];
  repositoryPointer:VCSDetails;
}

export interface VCSDetails extends RepositoryPointer {
  // @todo: make `movedObjects` and `tags` properties required after implementation of files tracking
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
