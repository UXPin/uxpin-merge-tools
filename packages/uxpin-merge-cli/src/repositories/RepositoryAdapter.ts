import { MovedFilePathsMap } from '../steps/serialization/DesignSystemSnapshot';

export interface CommitMetadata {
  author:string;
  date:string;
  hash:string;
  message:string;
}

export interface RepositoryPointer {
  branchName:string;
  commit:CommitMetadata;
}

export interface RepositoryAdapter {
  getCurrentBranch():Promise<string>;
  getLatestCommit():Promise<CommitMetadata>;
  getMovedFiles(r1:string, r2:string):Promise<MovedFilePathsMap>;
  getRepositoryPointer():Promise<RepositoryPointer>;
}

export interface RepositoryAdapterOptions {
  path:string;
}
