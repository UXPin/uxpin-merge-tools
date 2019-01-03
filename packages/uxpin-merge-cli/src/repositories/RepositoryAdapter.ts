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
  getRepositoryPointer():Promise<RepositoryPointer>;
}

export interface RepositoryAdapterOptions {
  path:string;
}
